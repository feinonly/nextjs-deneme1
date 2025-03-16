import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { token, password } = req.body;
        const filePath = path.join(process.cwd(), 'data', 'users.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileContents);

        const user = users.find(
            (user) => user.resetPasswordToken === token && user.resetPasswordExpires > Date.now()
        );

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = password;
        delete user.resetPasswordToken;
        delete user.resetPasswordExpires;

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        res.status(200).json({ message: 'Password has been reset' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}