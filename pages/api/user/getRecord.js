import users from '../../../models/User';
import connectMongo from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';

/*
    DÙng để lay record
    Tham số truyền vào là qua body acesstoken qua authorization bearer
*/
const JWT_SECRET = 'your-secret-key';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'GET') {
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
        const records = user.records;

        return res.status(200).json(records);
    }
}
