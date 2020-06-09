const { Schema, model } = require('mongoose');

const listSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    arrayMedia: [{
      id: String,
      // unique: true,
    }],
  },
  { timestamps: true },
);
const ListModel = model('List', listSchema);
module.exports = ListModel;