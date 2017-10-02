module.exports = function (mongoose) {
  var modelName = "category";
  
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    id: {
      type: Types.String,
      required: true
    },
    sourceId: {
      type: Types.String,
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: 'user'
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        user: {
          type: "MANY_ONE",
          model: "user"
        }
      }
    }
  };

  return Schema;
};