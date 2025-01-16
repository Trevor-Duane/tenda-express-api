import User from "../models/user.js";
import VerificationCodes from "../models/verification_codes.js";
import Role from "../models/role.js";
import Permissions from "../models/permissions.js";
import rolePermissions from "../models/role_permissions.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import db from "../config/database.js";
import { Sequelize } from "sequelize";
import { RegistrationEmailNotification } from "./RegistrationEmailNotification.js";

// Store refresh tokens

// export const register = async (req, res) => {
//   const { username, email, mobile, address, password, confirm_password } = req.body;
//   try {
//     // Validate user input
//     if (!username || !email || !mobile || !address || !password || !confirm_password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
//     if (password !== confirm_password) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }
//     // Check if the user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create a new user
//     const newUser = await User.create({
//       username,
//       email,
//       mobile,
//       address,
//       password: hashedPassword,
//     });

//     // Generate a random 6-digit verification code
//     const vCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number

//     // Store the verification code in the VerificationCodes table
//     await VerificationCodes.create({
//       userId: newUser.id, // Assuming userId is the foreign key in VerificationCodes table
//       code: vCode,
//     });

//     // Fetch the budget record using the retrieved budgetId
//     const [user_record] = await db.query(
//       `
//       SELECT users.username, verification_codes.code
//       FROM verification_codes
//       JOIN users ON verification_codes.userId = users.id
//       WHERE ID = :newId
//       `, {
//       replacements: [newUser.id],
//       type: Sequelize.QueryTypes.SELECT
//   });

//     await RegistrationEmailNotification(user_record)

//     return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }

// }

export const register = async (req, res) => {
  const { username, email, mobile, address, password, confirm_password } = req.body;
  try {
    // Validate user input
    if (!username || !email || !mobile || !address || !password || !confirm_password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      mobile,
      address,
      password: hashedPassword,
    });

    // Generate a random 6-digit verification code
    const vCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number

    // Store the verification code in the VerificationCodes table
    await VerificationCodes.create({
      userId: newUser.id, // Assuming userId is the foreign key in VerificationCodes table
      code: vCode,
    });

    // Fetch the username and verification code from the database using the userId
    const [user_record] = await db.query(
      `
      SELECT users.username, verification_codes.code
      FROM verification_codes
      JOIN users ON verification_codes.userId = users.id
      WHERE verification_codes.userId = :userId
      `, {
      replacements: { userId: newUser.id },
      type: Sequelize.QueryTypes.SELECT
    });

    // Send email notification with the verification code and username
    await RegistrationEmailNotification(user_record);

    return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   console.log("email & password", email, password)
//   try {
//     const user = await User.findOne({ where: { email } });
//     console.log("This is the user", user)

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User doesn't exist" })
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" })
//     }

//     const token = generateAccessToken(user.id);
//     const permissions = 
//     res.status(200).json({ success: true, token, user:user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }

// }
export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("email & password", email, password);
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    console.log("This is the user", user);

    if (!user) {
      return res.status(401).json({ success: false, message: "User doesn't exist" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate an access token for the user
    const token = generateAccessToken(user.id);

    /// Dynamic SQL to fetch permissions based on the user's role
    const permissions = await db.query(`
      SELECT p.permission_name
      FROM roles r
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE r.id = :roleId
    `, {
      replacements: { roleId: user.user_role }, // Use the user's role ID
      type: Sequelize.QueryTypes.SELECT,
    });

    // Extract permission names
    const permissionNames = permissions.map(permission => permission.permission_name);

    // Create a response object with necessary fields
    const responseData = {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        isVerified: user.isVerified,
        user_role: user.user_role,
        permissions: permissionNames,
      },
    };

    // Response with the cleaned up user data and permissions
    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({email});
//     console.log("This is the user", user)

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User doesn't exist" })
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" })
//     }

//     const token = generateAccessToken(user.id);
//     res.status(200).json({ success: true, token, user:user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }

// }

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
};

// export const refreshToken = (req, res) => {
//   const { token } = req.body;
//   if (!token) return res.sendStatus(401);
//   if (!refreshTokens.includes(token)) return res.sendStatus(403);
//   jwt.verify(token, 'refresh_secret_key', (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ email: user.email });
//     return res.json({ accessToken });
//   });
// };

export const verifyUserCode = async (req, res) => {
  const { email, code } = req.body;  // Expecting the email and code to be in the request body
  
  try {
    // 1. Validate input
    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    // 2. Find the user by email
    const user = await User.findOne({ where: { email } });
    console.log("*********************user*******************************")
    console.log(user)
    console.log("*********************user*******************************")
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Find the latest verification code for the user
    const verificationCode = await VerificationCodes.findOne({
      where: { userId: user.id },
    });

    console.log("*********************code*******************************")
    console.log(verificationCode)
    console.log("*********************code*******************************")
    
    if (!verificationCode) {
      return res.status(404).json({ message: 'Verification code not found' });
    }

    // 4. Compare the provided code with the stored verification code
    if (verificationCode.code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // 5. Update the user's 'isVerified' field to 1
    user.isVerified = 1;  // Assuming 'isVerified' is a field in your User model
    await user.save();  // Save the updated user record

    // 6. Respond with success
    return res.status(200).json({ message: 'User verified successfully' });

  } catch (error) {
    console.error('Error verifying user code:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findUserById = async (req, res) => {

}

export const findUserByRoleId = async (req, res) => {

}
export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json({ success: true, data: users })
  } catch (error) {
    return res.json({ message: error.message })
  }
}
export const editProfile = async (req, res) => {

}
export const updateProfileImage = async (req, res) => {
  const offer_cover = req.file ? req.file.path : null;
  const { userId } = req.body;


  try {
    // Read the uploaded file
    const imageData = fs.readFileSync(offer_cover.path);

    // Update the user's profile image in the database
    await User.update({ profileImage: imageData }, { where: { id: userId } });

    // Delete the temporary file
    fs.unlinkSync(offer_cover.path);

    return res.status(200).json({ message: 'Profile image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

// export const updateUserPassword = async (req, res) => {
//   const { userId, currentPassword, newPassword } = req.body;

//   try {
//     // Find the user in the database
//     const user = await User.findByPk(userId);
//     console.log("this is the user i found", user)
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify if the current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }

//     // Hash the new password
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the password in the database
//     await User.update(
//       { password: hashedPassword },
//       { where: { id: userId } }
//     );

//     res.status(200).json({
//       message: "Password updated successfully. Please log in again.",
//     });
//   } catch (error) {
//     console.error("Error changing password:", error);
//     res.status(500).json({ message: "An error occurred. Please try again." });
//   }
// };

export const updateUserPassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  console.log("Request body:", req.body);


  // Validate request payload
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find the user in the database
    const user = await User.findByPk(userId);
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    // if(hashedPassword){
    //   user.password = hashedPassword
    //   await user.save()
    // }
    await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );

    console.log("Password updated successfully for user ID:", userId);
    res.status(200).json({
      message: "Password updated successfully. Please log in again.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

