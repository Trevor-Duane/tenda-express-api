import passwordReset from "../models/passwordRest.js";
import User from "../models/user.js";
import dotenv from 'dotenv'
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config()


export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
    console.log(expiresAt)

    await passwordReset.create({
        user_id: user.id,
        reset_token: resetToken,
        email: email,
        expiresAt: expiresAt,
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
    });

    // Send reset email
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${resetLink}`
    });

    res.json({ message: 'Password reset link sent to your email' });
}

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    const resetRequest = await passwordReset.findOne({ where: { reset_token: token } });

    if (!resetRequest || resetRequest.expires_at < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findByPk(resetRequest.user_id);
    user.password = newPassword; // Make sure to hash the password before saving
    await user.save();

    resetRequest.status = 'completed';
    await resetRequest.save();

    res.json({ message: 'Password reset successfully' });
}

