import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  authId: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    required: true,
    default: 'en'
  },
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscription'
  }]
} , {
  toObject: {
    transform: (doc, ret, game) => {
      delete ret.__v;
      delete ret._id;
    }
  }
})

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;