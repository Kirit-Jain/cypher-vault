const express = require('express');
const { execFile } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); //Allow the fontend to access the backend

app.post('/encrypt', (req, res) => {
    const { password } = req.body;
    if (!password || password.trim() === "") 
    {
        return res.status(400).json({ error: "Password is required" });
    }

    const executablePath = path.resolve(__dirname, 'vault_core');

    execFile(executablePath, [password], (error, stdout, stderr) => {
        if(error || stderr) 
        {
            return res.status(500).json({ error: error ? error.message : stderr });
        }

        res.json({ encrypted: stdout.trim()});
    });
});


app.listen(3001, () => console.log('Server running on port 3001'));