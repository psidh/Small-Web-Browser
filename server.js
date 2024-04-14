// server.js
import('node-fetch').then(({ default: fetch }) => {
    const express = require('express');
    const app = express();
    const PORT = 3000;

    // Proxy endpoint
    app.get('/navigate', async (req, res) => {
        const url = req.query.url;
        if (!url) {
            res.status(400).send('URL parameter is required');
            return;
        }
        try {
            const response = await fetch(url);
            const data = await response.text();
            res.send(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    app.use(express.static('public'));

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
