import express from "express";
import { updateUser,deleteUser,getUser,getUsers } from "../controller/user.js";
import { verifyToken } from "../util/verifyToken.js";

const router = express.Router();


router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user, u are logged in")
})

//update User
router.put("/:id", updateUser);

//delete
router.delete("/:id",deleteUser);

//get
router.get("/:id", getUser);


//get all
router.get("/", getUsers);


export default router