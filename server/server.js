const express = require('express');
const path = require('path');
const cors = require('cors')
// require('dotenv').config();

const app = express();
// Init Middleware
app.use(express.json());
app.use(cors())

// Define Routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/notes', require('./routes/api/notes')); 

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
