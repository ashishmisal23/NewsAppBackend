const express = require('express')
const UserModel = require('../models/UserModel')
const router = express.Router()

router.post('/register', async function (req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send('User with this email already exists');
    }
    else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.send('User added successfully');
    }

  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.password === user.password && req.body.email === user.email) {
      const userWithoutPassword = { ...user.toObject(), password: undefined };
      return res.json(userWithoutPassword);
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.post('/profile', async function (req, res) {
  try {
    const email = req.body.email;
    const result = await UserModel.findOne({ email: email })
    res.json(result);

  } catch (error) {
    res.status(400).send('Something Went Wrong')
  }
})

module.exports = router
