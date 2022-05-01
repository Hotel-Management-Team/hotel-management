import { Router } from "express";
import verifyRoomTypeManage from "../middlewares/roomType.middleware";
import {
  getRoomType,
  postRoomType,
  putRoomType,
  deleteRoomType,
} from "../controllers/roomType.controller";

const router = Router();

router.get("/", verifyRoomTypeManage, getRoomType);

router.post("/", verifyRoomTypeManage, postRoomType);

router.put("/:id", verifyRoomTypeManage, putRoomType);

router.delete("/:id", verifyRoomTypeManage, deleteRoomType);

export default router;
