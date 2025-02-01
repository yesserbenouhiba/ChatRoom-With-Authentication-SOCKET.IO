express = require("express");
const router = express.Router();

const { signUp, signIn, signOut , getOnlineUsers } = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout/:id", signOut);
router.get("/online", getOnlineUsers)

module.exports = router;
