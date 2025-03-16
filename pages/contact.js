import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [contactId, setContactId] = useState('');

    const generateRandomId = () => {
        let id = '';
        for (let i = 0; i < 16; i++) {
            id += Math.floor(Math.random() * 7); // 0-9 arasında rastgele bir sayı ekle
        }
        return id;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = generateRandomId(); // Rastgele ID oluştur

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, email, message }), // ID'yi ekle
        });

        const data = await res.json();
        setResponseMessage(data.message); // Sunucudan gelen mesajı ayarla
        setContactId(id); // Oluşturulan ID'yi göster

        // Formu sıfırlama
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="form-container">
                    <h1>İletişim</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">İsim:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="message">Mesaj:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Gönder</button>
                    </form>
                    {responseMessage && (
                        <p>
                            {responseMessage} {contactId && `ID: ${contactId}`}
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;