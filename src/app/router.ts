import { Router } from "express";
import { VerifyCodeNumberTypeAndLength } from "../shared/middlewares/verify-code-number-type-length.middleware";
import { Controller } from "./controllers/controller";

export const router = Router();
const controller = new Controller();

router.get(
  "/boleto/:codeNumber",
  VerifyCodeNumberTypeAndLength,
  controller.getBillet
);
