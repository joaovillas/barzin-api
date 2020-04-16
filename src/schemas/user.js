import mongoose from '../database';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    user_type: {
        type: Number,
        required: true,
    },
    confirmed_email: {
        type: Boolean,
        default: false,
    },
    confirmed_phone: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: null,
    }
});

UserSchema.pre('save', async function(next) {    
    const hash = await bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;