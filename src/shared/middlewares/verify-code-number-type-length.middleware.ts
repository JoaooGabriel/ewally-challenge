import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../helpers/response/error.response";

export function VerifyCodeNumberTypeAndLength(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const codeNumber = request.params.codeNumber;
  const changeCodeNumberTypeToNumber = +codeNumber;

  if (isNaN(changeCodeNumberTypeToNumber)) {
    throw new BadRequestError(
      "Código do boleto fora do padrão, deve conter apenas numeral"
    );
  }

  const splittedCodeNumber = codeNumber.split("");

  if (splittedCodeNumber.length !== 46) {
    if (splittedCodeNumber.length !== 44) {
      throw new BadRequestError(
        "Código do boleto fora do padrão, tamanho diferente inválido"
      );
    }
  }

  next();
}
