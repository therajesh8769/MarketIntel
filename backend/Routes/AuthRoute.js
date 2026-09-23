const { Signup,Login,Logout } = require("../Controllers/AuthController");
const router = require("express").Router();
const {userVerification}=require("../Middlewares/AuthMIddelware");

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/',userVerification);


module.exports = router;