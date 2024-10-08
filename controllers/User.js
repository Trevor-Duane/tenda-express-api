import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'

// Store refresh tokens

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
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("email & password", email, password)
  try {
    const user = await User.findOne({ where: { email } });
    console.log("This is the user", user)

    if (!user) {
      return res.status(401).json({ success: false, message: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = generateAccessToken(user.id);
    res.status(200).json({ success: true, token, user:user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

}

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
  return jwt.sign({id}, process.env.JWT_SECRET)
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



export const findUserById = async (req, res) => {

}

export const findUserByRoleId = async (req, res) => {

}
export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
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
