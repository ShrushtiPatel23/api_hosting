const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const cors = require('cors');
const sequelize = require("./config/database.js");


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors())
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.get('/', (req,res) => res.send('Hello User'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));