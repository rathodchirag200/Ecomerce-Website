const mongoose = require('mongoose');

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   cartData: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        size: { type: String },
        quantity: { type: Number, default: 1 }
      }
    ],
    default: []
  }
})

const Trendzy = mongoose.model('Trendzy', Loginschema);

module.exports = Trendzy;
