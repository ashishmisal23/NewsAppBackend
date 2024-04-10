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

const port = process.env.PORT || 5000; // Use the specified port in .env file or default to 5000

const server = app.listen(port, () => {
  console.log(`Server on port ${port}`);
  console.log(`http://localhost:${port}`);
});
