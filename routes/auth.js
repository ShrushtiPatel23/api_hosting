const express = require('express');
const { createUser, userData, verifyOtp, number, updatePassword} = require("../controllers/auth.js");
const  token_auth  = require("../middleware/token_auth.js");


const router = express.Router();

//create account
router.post('/', createUser);

//verify number
router.post('/number', number);

//verify otp user
router.post('/verify', verifyOtp); 

//chnage password user
router.patch('/update/:phoneNumber', updatePassword); 

//data user
router.get('/userData', token_auth, userData); 

module.exports = router;