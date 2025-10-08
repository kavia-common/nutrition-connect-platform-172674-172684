import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { createSocketClient } from '../services/socket';

// PUBLIC_INTERFACE
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    const client = createSocketClient('/chat');
    socketRef.current = client;
    const off = client.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        setMessages(m => [...m, data]);
      } catch {
        setMessages(m => [...m, { text: msg }]);
      }
    });
    return () => {
      off && off();
      client.close();
    };
  }, []);

  function send() {
    if (!input.trim()) return;
    socketRef.current?.send({ text: input });
    setMessages(m => [...m, { text: input, self: true }]);
    setInput('');
  }

  return (
    <div>
      <Card title="Real-time Chat">
        <div style={{ minHeight: 200, border: '1px solid var(--border)', borderRadius: 8, padding: 8, marginBottom: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ textAlign: m.self ? 'right' : 'left', opacity: m.self ? 0.9 : 1 }}>
              {m.text || JSON.stringify(m)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ flex: 1 }} value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
