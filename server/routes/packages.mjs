import { Router } from "express";
import * as inventoryService from "../services/inventoryService.mjs";
import * as inventoryPackageService from "../services/inventoryPackageService.mjs";


import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(inventoryPackageService));

router.use(
  "/:packageId/inventory",
  restful(inventoryService, {
    filterParams: { packageId: "packageId" },
  })
);


export default router;
