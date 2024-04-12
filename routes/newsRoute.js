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

router.post('/getnewsitembyid/:newsid', async function (req, res) {
    try {
        let newsid = req.params.newsid;
        console.log(newsid);
        const data = await NewsItemModel.findById(newsid.toString());
        console.log(data);
        if (!data) {
            return res.status(404).json({ error: 'News item not found' });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error...' });
    }
});

router.delete('/deletenews/:newsid', async function (req, res) {
    try {
        let newsid = req.params.newsid;
        console.log(newsid);
        const data = await NewsItemModel.deleteOne({ _id: newsid });
        if (data.deletedCount === 0) {
            return res.status(404).json({ error: 'News Not Deleted' });
        }
        res.status(200).json({ message: 'News Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/getnewsitemsbyemail/:email', async (req, res) => {
    try {

        let email = req.body.email;
        const payload = { "postedByemail": email };
        const newsItems = await NewsItemModel.find(payload);
        res.json(newsItems);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error fetching news items');
    }
});


module.exports = router;
