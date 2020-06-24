const  mongoose = require("mongoose");

const  Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  stars: {
    type: Number,
  },
  review: {
    type: String,
  },
   owner: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});



ReviewSchema.virtual('products', {
  ref: 'Product', 
  localField: 'name', 
  foreignField: 'reviews',
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 } 
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;