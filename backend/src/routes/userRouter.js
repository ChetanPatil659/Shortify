import { Router } from "express";
import User from "../models/UserModel.js";
import { getAuthToken } from "../middlewares/authToken.js";
import { createUser, loginUser } from "../services/userServices.js";

const router = Router()

router.post("/", async (req, res) => {
    const payload = req.body;
    
    if (!payload.email || !payload.fullName || !payload.password) {
        res.status(400).json("Missing required paramaters");
    } else {
        try {
            const existingUser = await User.findOne({ email: payload.email });
            if (existingUser) {
                res.status(401).json({ "error": "user already exists" });
            } else {
                const user = await createUser(payload);
                req['user'] = user
                getAuthToken(req, res)
            }
        } catch (error) {
            res.status(500).json("Internal server error");
        }
    }
})

router.post(
    "/login",
  async (req, res, next) => {
    const payload = req.body;
    if (!payload.email || !payload.password) {
      res.status(400).json("Missing required paramaters");
    } else {
      const userData = await loginUser(payload);

      if (typeof userData === "object" && userData.email) {
        req["user"] = userData;
        getAuthToken(req, res);
      } else {
        res.status(403).json("Invalid email/password");
      }
    }
  }
)

export default router