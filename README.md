# Secure Vault (Hybrid Architecture)

A Full-Stack security application that demonstrates inter-process communication between high-level web interfaces and low-level system binaries.

**Tech Stack:**
* **Frontend:** React.js
* **Backend:** Node.js (Express)
* **System Core:** C++ (std::fstream, Bitwise XOR)
* **Build Tool:** Make

## Architecture
The application uses a **React** frontend to accept user input. This input is sanitized and sent to a **Node.js** server. The server spawns a child process to run a compiled **C++ executable**, which performs the cryptographic operations (XOR Cipher) and handles file I/O for persistent storage.

## How to Run

### Prerequisites
* Node.js installed
* G++ Compiler (MinGW for Windows)
* Make (Optional, commands provided below)

### 1. Clone the Repo
```bash
git clone https://github.com/Kirit-Jain/cypher-vault.git
```

### 2. Setup Dependencies
```bash
# Backend Deps
npm install

# Frontend Deps
cd client
npm install
cd ..
```

### 3. Compile the C++ Core
```bash
g++ -std=c++17 vault_core.cpp -0 vault_core.exe
```

### 4. Run the Application
* Termianl 1(Backend):
   ```Bash
    node server.js
   ```

* Terminal 2(Backend):
  ```Bash
    cd client
    npm start
  ```
