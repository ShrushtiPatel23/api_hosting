const express = require('express');
const { getUser, createUser, viewUser, deleteUser, updateUser } = require('../controllers/users.js');
const  token_auth  = require("../middleware/token_auth.js");

const router = express.Router();

//get all user
router.get('/', token_auth, getUser);

//add user
router.post('/', token_auth, createUser) 

//user details
router.get('/:id', token_auth, viewUser)

//delete user
router.delete('/:id', token_auth, deleteUser)

//user update
router.patch('/:id', token_auth,  updateUser)

module.exports = router;