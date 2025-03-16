import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ email, password });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}