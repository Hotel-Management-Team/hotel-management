import { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware";
import {
  putBannedUser,
  putPermissionUser,
} from "../controllers/permission.controller";
const router = Router();

router.put("/banned/:id", verifyAdmin, putBannedUser);
router.put("/:id", verifyAdmin, putPermissionUser);

export default router;
