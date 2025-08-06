import { Router } from "express";
import * as searchService from "../services/searchService.mjs"
const router = new Router();

router.get("/", async (req, res) => {
  const response = await searchService.search(req.user);
  res.json(response);
});

export default router;
