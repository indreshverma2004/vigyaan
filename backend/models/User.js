const mongoose=require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  user: String, 
  email: String,
  password: String
  }
);

const UserModel = mongoose.model('user', userSchema);
module.exports=UserModel;