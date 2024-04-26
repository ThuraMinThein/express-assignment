import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";

import {
  userValidateBodyData,
  validateParamData,
} from "../validation/Validate.mjs";

import { userSchema, paramSchema } from "../validation/Schemas.mjs";

const router = Router();

router.post("/users", userValidateBodyData(userSchema), createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", validateParamData(paramSchema), getUser);
router.patch(
  "/users/:id",
  validateParamData(paramSchema),
  userValidateBodyData(userSchema),
  updateUser
);
router.delete("/users/:id", validateParamData(paramSchema), deleteUser);

export default router;
