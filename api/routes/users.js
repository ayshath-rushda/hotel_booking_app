import express from "express";
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controller/user.js";
import { verifyToken, verifyUser,verifyAdmin} from "../util/verifyToken.js";

const router = express.Router();


/*router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user, u are logged in");
});

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user,u are logged in and u can delete ur acc");
});

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin,u are loged in and u can delete  all acc");
});*/

//create User
router.post("/", verifyAdmin, createUser);

//update User
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id",verifyUser,deleteUser);

//get
router.get("/:id",verifyUser, getUser);


//get all
router.get("/", verifyAdmin,getUsers);


export default router;