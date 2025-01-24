// Required dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

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
app.use('/create', createIPORoutes)
app.use('/user', userRoutes)

// Error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
});