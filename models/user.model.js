const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    first_name: String,
    last_name: String,
    staff_status: {
        type: Boolean,
        default: false,
    },
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password is not modified
    }

    const saltRounds = 10; // Adjust saltRounds as needed
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

// Compare password with hashed password during login/authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);