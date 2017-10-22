import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  sourceId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  country: {
    type: String
  },
  language: {
    type: String
  },
  category: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  }
} , {
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
    }
  }
})

const ModelClass = mongoose.model('subscription', subscriptionSchema);

module.exports = ModelClass;