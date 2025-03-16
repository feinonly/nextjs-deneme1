import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { id, name, email, message } = req.body;

        // JSON dosyasının yolu
        const filePath = path.join(process.cwd(), 'data', 'contacts.json');

        // Mevcut verileri oku
        let contacts = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            contacts = JSON.parse(fileData);
        }

        // Yeni iletişim verisini ekle
        contacts.push({ id, name, email, message });

        // Verileri JSON dosyasına yaz
        fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

        res.status(200).json({ message: 'Mesaj başarıyla gönderildi!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}