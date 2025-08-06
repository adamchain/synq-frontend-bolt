import { Router } from "express";
import * as appointmentService from "../services/appointmentService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.get("/upcoming", async (req, res) => {
  const response = await appointmentService.getUpcoming(req.user);
  res.json(response);
});

router.use("/", restful(appointmentService));


export default router;
