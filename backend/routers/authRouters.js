const { authControllers } = require("../controllers");
const router = require("express").Router();


router.post("/register", authControllers.userRegis);
router.get("/verified/:token", authControllers.verifiedEmail)


module.exports = router