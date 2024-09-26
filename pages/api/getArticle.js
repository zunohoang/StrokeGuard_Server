import users from '../../models/User';
import connectMongo from '../../lib/mongoose';
import jwt from 'jsonwebtoken';
import articles from '../../models/Article';

/*
    DÙng để lay record
    Tham số truyền vào là qua body acesstoken qua authorization bearer
*/
const JWT_SECRET = 'your-secret-key';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === 'GET') {

        const articles_ = await articles.find();

        return res.status(200).json({ articles: articles_ });
    }
}
