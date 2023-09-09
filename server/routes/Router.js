const express=require('express');
const { signin, signup, test } = require('../controller/userController');
const { uploadVideo, myVideos } = require('../controller/videoContrroller');
const router=express.Router();
router.post('/signup',signup);
router.post('/signin',signin)
router.post('/test',test)
router.post('/post',uploadVideo)
router.get('/myvideo',myVideos)
module.exports=router