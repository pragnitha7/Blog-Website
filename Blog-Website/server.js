const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
mongoose.connect('mongodb://localhost/blog');
// mongoose.set('useFindAndModify', false);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);


const postSchema = new mongoose.Schema({
	title: String,
	author: String,
	content: String
});

const Post = mongoose.model('Post', postSchema);
const bodyparser = require("body-parser");


app.use( express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
	// const posts = await Post.find();
	const posts = await Post.find().lean();
	res.sendFile(__dirname + '/views/index.html');
});


// for posts
app.get('/api/posts', async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
});

app.post('/api/posts', async (req, res) => {
	try{
		const { title, author, content } = req.body;
		console.log('Received data:', { title, content });
		const newPost = new Post({ title, author, content });
		await newPost.save();
		console.log('Post saved successfully.');

		res.status(201).json({ message: 'Post created successfully' });
	}catch (error) {
		console.error('Error saving post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/post', (req, res) => {
	res.sendFile(__dirname + '/views/post.html');
});

app.post('/post', async (req, res) => {
	const { title, author, content } = req.body;
	const newPost = new Post({ title, author, content });
	await newPost.save();
	res.redirect('/');
});


// for search
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.query;
        const results = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
            ],
        }).lean();

        res.json(results);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
