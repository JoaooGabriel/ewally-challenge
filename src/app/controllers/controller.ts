import { Request, Response } from "express";
import { StatusCode } from "../../shared/enums/status-code.enums";
import { ServiceError } from "../../shared/helpers/response/error.response";
import { Service } from "../services/service";

const service = new Service();

export class Controller {
  public async getBillet(request: Request, response: Response) {
    try {
      const billet = service.validateCodeNumber(
        request.params.codeNumber
      );

      return response.status(200).json(billet);
    } catch (err) {
      if (err instanceof ServiceError) {
        return response.status(err.statusCode).json({
          error: err.message,
        });
      }

      return response
        .status(StatusCode.INTERNAL_ERROR)
        .json({ error: `Erro no servidor - Error ${err}` });
    }
  }
}
