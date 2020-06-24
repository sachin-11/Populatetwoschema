const express = require('express')
const router = new express.Router()
const Product = require('../models/Product');
const Review = require('../models/Review');
const Joi = require('@hapi/joi');

 
 
router.get('/', async (req, res) => {
      try {
          const product = await Product.find().populate('reviews');
          res.status(200).json({ success: true, data: product})
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false , message: 'Server Error'})  
      }
});

router.post('/', async (req, res) => {
  let Schema = Joi.object().keys({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    reviews: Joi.array().items(Joi.string().required()),
    //_id: Joi.objectId(),
  })
  var prod = Schema.validate(req.body)
  if(prod.error)
    return res.status(403).send(prod.error.details[0].message)
  console.log('value==========\n', prod.value);
    try {
        const product = await Product.create(req.body);
         res.status(200).json({ success: true, data: product})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false})
    }
})


router.post("/:id", async (req, res) =>  {
    let review =  await Review.create(req.body);
      let product = await Product.findOneAndUpdate({ _id: req.params.id}, { $push: { reviews: review._id}}, { new: true });
      res.status(200).json(product)
      
});

// Route for retrieving a Product by id and populating it's Review.
  router.get('/:id', async (req,res) => {
      try {
          const product = await Product.findOne({ _id: req.params.id}).populate('reviews');
          res.status(200).json({ success: true, data: product})
      } catch (error) {
          console.error(error.message);
          res.status(500).json({ success: true, msg: 'Server Error'})
      }
  })

module.exports = router;