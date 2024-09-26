import users from '../../../models/User';
import connectMongo from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';

/*
    DÙng để tao record
    Tham số truyền vào là acesstoken qua authorization bearer, va thong tin record
    {
        time: Number,
        result: Number
    }
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

        const record = {
            time: req.body.time,
            result: req.body.result
        }

        user.records.push(record);
        await user.save();

        return res.status(200).json(user);
    }
}
