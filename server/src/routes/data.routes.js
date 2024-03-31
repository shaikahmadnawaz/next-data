import { Router } from "express";
import {
  createData,
  deleteData,
  getData,
  getSingleData,
  sendDataByEmail,
  updateData,
} from "../controllers/data.controllers.js";

const router = Router();

router.route("/").post(createData).get(getData);
router.route("/:id").put(updateData).get(getSingleData).delete(deleteData);
router.route("/sendEmail").post(sendDataByEmail);

export default router;
