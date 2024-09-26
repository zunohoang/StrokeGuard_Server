// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, requires: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    phone_sos: { type: String, required: true },
    records: [
        {
            time: { type: Number, required: true },
            result: { type: Number, required: true }
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;