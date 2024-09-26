// models/Article.js
import mongoose from 'mongoose';

const aricleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Number, required: true },
    author: { type: String, required: true },
});

const Article = mongoose.models.Article || mongoose.model('Article', aricleSchema);

export default Article;