import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token);
    }
  }, [router.query.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    if (response.ok) {
      router.push('/sign-in');
    } else {
      console.error('Password reset failed');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;