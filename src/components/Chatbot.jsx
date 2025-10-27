import React, { useState } from 'react';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! How can I help you?' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setMessages(prev => [...prev, { sender: 'bot', text: `You said: "${input}"` }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-4 rounded-full shadow-lg text-white font-bold hover:scale-105 transition-transform"
      >
        Chat
      </button>
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden mt-2">
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`my-1 p-1 rounded ${msg.sender==='bot' ? 'bg-teal-100 text-black' : 'bg-blue-400 text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded p-1"
            />
            <button onClick={sendMessage} className="ml-2 bg-green-400 text-white px-3 rounded hover:scale-105 transition-transform">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
