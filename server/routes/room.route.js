import { Router } from "express";
import verifyRoomManage from "../middlewares/room.middleware";
import {
  getRoom,
  postRoom,
  putRoom,
  deleteRoom,
  findRoom,
} from "../controllers/room.controller";

const router = Router();

router.get("/", verifyRoomManage, getRoom);

router.get("/findRoom", verifyRoomManage, findRoom);

router.post("/", verifyRoomManage, postRoom);

router.put("/:id", verifyRoomManage, putRoom);

router.delete("/:id", verifyRoomManage, deleteRoom);

export default router;
