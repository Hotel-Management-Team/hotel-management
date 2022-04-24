import { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware";
import { putBannedUser } from "../controllers/permission.controller";
const router = Router();

router.put("/banned/:id", verifyAdmin, putBannedUser);

export default router;
