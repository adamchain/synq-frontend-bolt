import { Router } from "express";
import restful from "../lib/restful.mjs";
import * as clientService from "../services/clientService.mjs";
import * as clientPhoneService from '../services/ClientPhoneService.mjs'
import * as clientReferralService from '../services/ClientReferralService.mjs'

const router = new Router();

router.use("/", restful(clientService));

router.use(
  "/:clientId/phones",
  restful(clientPhoneService, {
    filterParams: { clientId: "clientId" },
  })
);

router.use(
  "/:clientId/referrals",
  restful(clientReferralService, {
    filterParams: { clientId: "clientId" },
  })
);

export default router;
