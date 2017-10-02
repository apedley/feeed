module.exports = mongoose => {
  const modelName = "user";
  
  const Types = mongoose.Schema.Types;

  let Schema = new mongoose.Schema({
    email: {
      type: Types.String,
      required: true,
      unique: true
    },
    password: {
      type: Types.String,
      required: true,
      exclude: true,
      allowOnUpdate: false
    },
    
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        subscriptions: {
          type: "ONE_MANY",
          foreignField: "user",
          model: "subscription"
        },
        categories: {
          type: "ONE_MANY",
          foreignField: "user",
          model: "category"
        },
      }
    }
  };
  
  return Schema;
};