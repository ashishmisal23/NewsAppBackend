const express = require('express');
const dbConnect = require('./dbConnect');
const cors = require('cors');

const app = express();

app.use(cors());

const newsRoute = require('./routes/newsRoute');
const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use('/api/newsitems/', newsRoute);
app.use('/api/users/', userRoute);

app.get('/', (req, res) => res.send('Invalid Requrest...'));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is Running on port http://localhost:${port}`);
});
