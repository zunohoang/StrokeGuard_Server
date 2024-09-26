import users from '../../models/User';
import connectMongo from '../../lib/mongoose';
import jwt from 'jsonwebtoken';

/*
    Dung để đăng kí
    Tham số truyền vào là thong tin người dùng qua body
*/
const JWT_SECRET = 'your-secret-key';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'POST') {

        const full_name = req.body.full_name;
        const username = req.body.username;
        const password = req.body.password;
        const phone_number = req.body.phone_number;
        const phone_sos = req.body.phone_sos;
        const email = req.body.email;

        const userExist = await users.findOne({ username: username });
        if (userExist) {
            return res.status(400).json({
                message: 'Nguoi dung da ton tai'
            });
        }

        const user = await users.create({
            full_name: full_name,
            username: username,
            password: password,
            phone_number: phone_number,
            phone_sos: phone_sos,
            email: email,
            records: []
        });

        return res.status(200).json(user);
    }
}
