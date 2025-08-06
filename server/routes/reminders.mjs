import { Router } from "express";
import * as reminderService from "../services/reminderService.mjs";
import restful from "../lib/restful.mjs";

const router = new Router();

router.get("/upcoming", async (req, res) => {
  const response = await reminderService.getUpcoming(req.user);
  res.json(response);
});

router.use("/", restful(reminderService));

export default router;
