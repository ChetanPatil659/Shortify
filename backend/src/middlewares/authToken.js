import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/index.js";
import User from "../models/UserModel.js";

//generate access token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            isLoggedIn: true,
            id: user.id,
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
};

export const getAuthToken = async (req, res) => {
    const user = req["user"];
    const accessToken = generateAccessToken(user);
    res
        .status(200)
        .json({ email: user.email, accessToken, isLoggedIn: true, userId: user.id });
};

export const verifyAccessToken = async ( req, res, next ) => {
    // Get the token from the request header
    const token = req.headers['authorization'].split(' ').pop()

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    // Verify the token using a secret key
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      // If verification fails, send an error response
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      }
      // If verification succeeds, pass the decoded data to the next middleware
      try {
        const user = await User.findOne({ email: decoded.email });
        req["user"] = user ;
        next();
      } catch (error) {
        return res.status(401).send({ message: "Invalid user" });
      }
    });
  };