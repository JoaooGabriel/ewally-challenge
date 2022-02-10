import { Request, Response } from "express";
import { Controller } from "./../../../src/app/controllers/controller";
import { global } from "./../../../src/shared/data/global.data";
import { BadRequestError } from "./../../../src/shared/helpers/response/error.response";

function internalServerError(message: string) {
  throw new Error(message);
}

function badRequestError(message: string) {
  throw new BadRequestError(message);
}

describe("Controllers tests", () => {
  let controller: Controller;
  let request: Partial<Request>;
  let response = {} as Response;
  let codeNumber: string;
  const mockResponse = () => {
    response.json = jest.fn().mockReturnValue(response);
    response.status = jest.fn().mockReturnValue(response);

    return response;
  };

  beforeAll(() => {
    controller = new Controller();
  });

  beforeEach(() => {
    request = {};
    response = mockResponse();
  });

  describe("success", () => {
    it("should be return code number data of billet with sucess", async () => {
      codeNumber = global.codeNumber.success.valid;
      request = {
        params: {
          codeNumber,
        },
      };

      await controller.getBillet(request as Request, response as Response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        amount: "504.82",
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });
  });

  describe("error", () => {
    it("should not be return code number data, return internal server error", async () => {
      await controller.getBillet(request as Request, response as Response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error:
          "Erro no servidor - Error TypeError: Cannot read property 'codeNumber' of undefined",
      });
    });

    it("should not be return code number data, return bad request error", async () => {
      codeNumber = global.codeNumber.invalid.productIndentification;
      request = {
        params: {
          codeNumber,
        },
      };
      await controller.getBillet(request as Request, response as Response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        error:
          "Código do boleto fora do padrão, número de Identificação do Produto inválido",
      });
    });
  });
});
