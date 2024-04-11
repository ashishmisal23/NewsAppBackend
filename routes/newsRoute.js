const express = require('express');
const NewsItemModel = require('../models/NewsItem');
const router = express.Router();

router.post('/addnewsitem', async (req, res) => {
    try {
        const newitem = new NewsItemModel(req.body);
        await newitem.save();
        res.send('News added successfully');
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

router.get('/getallnewsitems', async (req, res) => {
    try {
        const data = await NewsItemModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching news items');
    }
});

router.post('/getnewsitembyid/:newsid', async (req, res) => {
    try {
        const newsid = req.params.newsid;
        const data = await NewsItemModel.findOne({ _id: newsid });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching news item..');
    }
});

router.post('/getnewsitemsbyemail/:email', async (req, res) => {
    try {
        const email = req.params.email; 
        const newsItems = await NewsItemModel.find({ "postedBy.email": email }); 
        res.json(newsItems);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching news items');
    }
});


module.exports = router;
