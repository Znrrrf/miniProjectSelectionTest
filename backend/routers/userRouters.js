const { userControllers } = require("../controllers");
const router = require("express").Router();


router.get("/", userControllers.getAllUsers);
router.delete("/:id", userControllers.deleteUser);

module.exports = router