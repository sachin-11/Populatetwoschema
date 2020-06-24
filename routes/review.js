const express = require('express')
const router = new express.Router()
const Review = require('../models/Review');
const Product = require('../models/Product');

 
 
router.get('/', async (req, res) => {
      try {
          const review  = await Review.find().populate({
            path: 'products',
            select: 'name'
          });
          res.status(200).json({ success: true, data: review})
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false , message: 'Server Error'})  
      }
});


router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).json({ success: true, data: review})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server Error'})
  }
})


module.exports = router;