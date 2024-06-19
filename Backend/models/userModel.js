import mongoose from "mongoose";
import { type } from "os";

const users = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  refresh_Token:{
    type:String,
  }
});


const User = mongoose.model('User', users);

export default User

