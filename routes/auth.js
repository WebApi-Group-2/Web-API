const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');


// add methods here 


module.exports = router