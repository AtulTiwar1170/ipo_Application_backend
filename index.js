// Required dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
const connect = require('./db/db.connection')

// Routes
const userRoutes = require('./routes/user.routes')
const createIPORoutes = require('./routes/create.IPO.routes')
const publicRoutes = require('./routes/public.routes')

// Use routes
app.use('/', publicRoutes)
app.use('/api/create', createIPORoutes)
app.use('/api/user', userRoutes)

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
});