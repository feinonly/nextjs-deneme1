import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            router.push('/sign-in');
        } else {
            console.error('Password reset failed');
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <p>
                Remembered your password? <Link href="/sign-in">Sign In</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;