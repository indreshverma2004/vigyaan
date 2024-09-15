const express=require('express');
const router=express.Router();
const UserModel=require('../models/User');

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await UserModel.findOne({ email });
      
      if (!user || user.password !== password) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      return res.json({ success: true, user });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
  // Signup route
  router.post('/signup', async (req, res) => {
    try {
      const user = await UserModel.create(req.body);
      return res.json({ success: true, user });
    } catch (err) {
      return res.status(500).json({ success: false, err: 'Error creating user' });
    }
  });
  
  
  module.exports = router;