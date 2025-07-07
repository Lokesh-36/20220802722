const express = require('express');
const app = express();
const urlRoutes = require('./routes/urlRoutes');
const logger = require('./middlewares/logger');

app.use(express.json());
app.use(logger); // Custom logging middleware
app.use('/shorturls', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
