const express = require('express')
const router = new express.Router()
const Review = require('../models/Review');
const Product = require('../models/Product');

 
 
router.get('/', async (req, res) => {
      try {
          const review  = await Review.find().populate({
            path: 'products',
            ref: 'stars'
          })
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


router.post("/:id", async (req, res) =>  {
  let product =  await Product.create(req.body);
    let review = await Review.findOneAndUpdate({ _id: req.params.id}, { $push: { owner: product._id}}, { new: true });
    res.status(200).json(review)
    
});



module.exports = router;