import { Router } from "express";
import verifyToken from '../middlewares/auth.middleware';
import { getRoomType, postRoomType, putRoomType, deleteRoomType } from "../controllers/roomType.controller";

const router = Router();

router.get("/", getRoomType);

router.post("/", verifyToken, postRoomType);

router.put("/:id", verifyToken, putRoomType);

router.delete("/:id", verifyToken, deleteRoomType);

export default router;
