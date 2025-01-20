import { User } from '../models'; // Assuming you have a User model
import { AuditTrail } from '../models/AuditTrail'; // Import the AuditTrail model

// Controller to update the role of a user based on their email
export const updateUserRole = async (req, res) => {
  const { email, role } = req.body;
  const updatedBy = req.user.email; // Assuming you are getting the logged-in user's email from JWT or session

  try {
    // Validate user input
    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    // Validate that the role is one of the allowed values (1-6)
    const validRoles = [1, 2, 3, 4, 5, 6];
    if (!validRoles.includes(Number(role))) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if the user exists
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store the old role data
    const oldData = {
      role: existingUser.role,
    };

    // Update the user's role
    existingUser.role = role;
    await existingUser.save();

    // Store the new role data
    const newData = {
      role: existingUser.role,
    };

    // Log the change to the AuditTrail
    await AuditTrail.create({
      action: 'update',
      modelName: 'User',
      recordId: existingUser.id,
      oldData, // Store the old role
      newData, // Store the new role
      updatedBy, // Store the person who made the update
    });

    return res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user: existingUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
