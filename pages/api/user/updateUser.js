import users from '../../../models/User';
import connectMongo from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';

/*
    DÙng để cap nhap thong tin user
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

        if (req.body.full_name) {
            user.full_name = req.body.full_name;
        }

        if (req.body.phone_number) {
            user.phone_number = req.body.phone_number;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        await user.save();

        return res.status(200).json(user);
    }
}
