const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./routes/Userrout');
const SlotRoutes = require('./routes/Slotrout');
require('./initslots'); // Ensure this is only importing the initialization script

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Vigyaan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

app.use('/api', UserRoutes);
app.use('/api', SlotRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
