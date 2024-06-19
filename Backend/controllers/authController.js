import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username)
      return next(errorHandler(401, "fill all feilds"));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({ email, password: hashedPassword, username });
    await user.save();
    const { password: hashed, ...rest } = user.toObject();

    res.status(201).json({
      success: true,
      user: rest,
      message: "User created Successfully",
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res
        .status(401)
        .json({ success: false, message: "Username or Email already exists" });
    }
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return next(errorHandler(401, "fill all feilds"));

    const isUser = await User.findOne({ email });
    if (!isUser) return next(errorHandler(401, "Invalid Email or Password"));

    const isPassword = bcryptjs.compareSync(password, isUser.password);
    if (!isPassword)
      return next(errorHandler(401, "Invalid Email or Password"));
    const acces_Token = Jwt.sign({ id: isUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    }); //accessToken expires in 15 minutes
    const refresh_Token = Jwt.sign(
      { id: isUser._id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    await User.updateOne({ _id: isUser._id, refresh_Token: refresh_Token });

    res
      .cookie("acces_Token", acces_Token, { httpOnly: true, maxAge: 900000 }) //15 minutes
      .cookie("refresh_Token", refresh_Token, {
        httpOnly: true,
        maxAge: 604800000,
      }) // 7 days
      .status(200)
      .json({ success: true, message: "User logged in Successfully " });
  } catch (error) {
    next(error);
  }
};



export const signOut = async(req,res,next)=> {
  try{
    res.clearCookie('acces_Token','refresh_Token')
    res.status(200).json({message:"signedOut successfully"})
  }
  catch(error){
   next(errorHandler(500,'error in signout controller'))
  }

}