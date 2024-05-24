import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SendSMS() {
  const router = useRouter();
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, body: message }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Send SMS</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="Recipient's Phone Number"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send SMS</button>
      </form>
    </div>
  );
}
