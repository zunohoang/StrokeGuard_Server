import users from '../../models/User';
import connectMongo from '../../lib/mongoose';
import jwt from 'jsonwebtoken';

/*
    DÙng để đăng nhập
    Tham số truyền vào là username, password qua body
*/
const JWT_SECRET = 'your-secret-key';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'POST') {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Thieu tham so'
            });
        }
        const user = await users.findOne({ username: req.body.username, password: req.body.password });

        if (!user) {
            return res.status(400).json({
                message: 'Sai ten dang nhap hoac mat khau'
            });
        }

        const accessToken = jwt.sign({
            username: user.username,
            full_name: user.full_name,
            phone_number: user.phone_number,
            records: user.records
        }, JWT_SECRET);

        return res.status(200).json({
            token: accessToken
        });
    }
}
