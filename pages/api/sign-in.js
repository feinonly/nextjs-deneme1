import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'User signed in successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}