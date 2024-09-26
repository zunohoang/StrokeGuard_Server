import users from '../../../models/User';
import connectMongo from '../../../lib/mongoose';
import jwt from 'jsonwebtoken';
import articles from '../../../models/Article';

/*
    DÙng để add Article
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

        // add Article
        const article = {
            title: req.body.title,
            content: req.body.content,
            time: req.body.time,
            author: req.body.author
        }

        // them article vao artilces
        await articles.create(article);

        return res.status(200).json(article);
    }
}
