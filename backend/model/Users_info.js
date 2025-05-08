const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true, min: 1 },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: false }, // Store base64 image
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;
