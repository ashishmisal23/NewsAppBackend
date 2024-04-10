const express = require('express');
const dbConnect = require('./dbConnect');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

const newsRoute = require('./routes/newsRoute');
const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use('/api/newsitems/', newsRoute);
app.use('/api/users/', userRoute);

app.get('/', (req, res) => res.send('Hello Ashish'));

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Example app listening on port ${port}`);
});
