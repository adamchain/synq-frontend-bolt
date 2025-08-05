import { Router } from "express";
import * as authService from "../services/authService.mjs"

const router = new Router();

router.post("/authenticate", async (req, res) => {
  const result = await authService.authenticate({ email: req.body.email, password: req.body.password, branchId: req.body.branchId })
  res.json(result);
});

router.post("/register", async (req, res) => {
  const result = await authService.register({ email: req.body.email, password: req.body.password, branchId: req.body.branchId })
  res.json(result);
});

export default router;
