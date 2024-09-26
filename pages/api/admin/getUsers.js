import users from '../../../models/User';
import connectMongo from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';
import { useReducer } from 'react';

/*
    DÙng để lay userList
    Tham số truyền vào là qua body acesstoken qua authorization bearer
*/
const JWT_SECRET = 'your-secret-key';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'POST') {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Token is invalid' });
        }

        const user = await users.findOne({ username: decoded.username });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.username !== 'admin') {
            return res.status(401).json({ message: 'Not admin' });
        }

        const usersList = await users.find({});

        return res.status(200).json({ users: usersList });
    }
}
