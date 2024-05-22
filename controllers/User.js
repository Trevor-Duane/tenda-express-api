import User from "../models/user.js";
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const { username, email, mobile, address, password, confirm_password} = req.body;
    

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
    
        res.status(201).json({ message: 'User registered successfully', user: newUser });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

}

export const login = async (req, res) => {

}

export const findUserById = async (req, res) => {

}

export const findUserByRoleId = async (req, res) => {

}
export const findAllUsers = async (req, res) => {

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

        res.status(200).json({ message: 'Profile image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
