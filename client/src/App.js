import React, { useState } from 'react';
import './App.css'; // Keep this to use default styling, or remove if you want

function App() {
  const [password, setPassword] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [status, setStatus] = useState("");

  const handleEncrypt = async () => {
    if (!password.trim()) 
    {
      setStatus("Error: Please enter a password.");
      return; // Stop here, don't call the server
    }
    setStatus("Processing...");
    try {
      // 1. Send data to YOUR Backend (running on port 3001)
      const response = await fetch('http://localhost:3001/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password }),
      });
      
      const data = await response.json();
      
      // 2. Display the result from C++
      if (data.encrypted) {
        setEncrypted(data.encrypted);
        setStatus("Success!");
      } else {
        setStatus("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      setStatus("Error: Could not connect to backend.");
    }
  };

  return (
    <div className="App" style={{ padding: "50px", fontFamily: "Arial" }}>
      <h1>Cypherock Secure Vault</h1>
      <h3>Hybrid Architecture: React → Node.js → C++</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Enter Secret Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px", fontSize: "16px" }}
        />
        
        <button onClick={handleEncrypt} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Encrypt
        </button>
      </div>

      {status && <p><strong>Status:</strong> {status}</p>}

      {encrypted && (
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "5px" }}>
          <strong>Encrypted Output (from C++ Core):</strong>
          <p style={{ fontFamily: "monospace", fontSize: "1.4em", color: "#333" }}>{encrypted}</p>
        </div>
      )}
    </div>
  );
}

export default App;