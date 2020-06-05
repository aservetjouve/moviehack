const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
const UserModel = model('User', userSchema);
module.exports = UserModel;
