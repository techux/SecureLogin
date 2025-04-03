const express = require("express");
const { auth, restrictTo } = require("../middlewares/auth.middleware");

const {
  getAllUserController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getAllUserController);
router.get("/:id", getUserByIdController);

router.post("/", auth, restrictTo(['admin']), createUserController);
router.put("/:id", auth, restrictTo(['admin']), updateUserController);
router.delete("/:id", auth, restrictTo(['admin']), deleteUserController);

module.exports = router;
