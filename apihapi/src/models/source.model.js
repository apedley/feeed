module.exports = function (mongoose) {
  var modelName = "source";
  
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    id: {
      type: Types.String,
      required: true
    },
    name: {
      type: Types.String,
      required: true
    },
    description: {
      type: Types.String
    },
    url: {
      type: Types.String,
      required: true
    },
    language: {
      type: Types.String,
      required: true
    },
    country: {
      type: Types.String
    },
    category: {
      type: Types.String
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
      }
    }
  };

  return Schema;
};