import { Request, Response } from "express";
import { Controller } from "./../../../src/app/controllers/controller";
import { global } from "./../../../src/shared/data/global.data";

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
    it("should be return data code number of billet with sucess", async () => {
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

  // describe("error", () => {
  //   it("should be return 400 internal server error", async () => {
  //     request = {
  //       params: {
  //         codeNumber: "",
  //       },
  //     };
  //     const mockBadRequest = new BadRequestError(
  //       "Código do boleto fora do padrão"
  //     );

  //     jest.spyOn(controller, "getBillet").mockImplementationOnce(async () => {
  //       throw mockBadRequest;
  //     });

  //     await controller.getBillet(request as Request, response as Response);

  //     expect(response.status).toHaveBeenCalledWith(500);
  //     expect(response.json).toHaveBeenCalledWith({
  //       error: "Código do boleto fora do padrão",
  //     });
  //   });

  //   it("should be return 500 internal server error", async () => {
  //     request = {
  //       params: {
  //         codeNumber: "",
  //       },
  //     };
  //     const mockInternalServerError = new Error("Erro no servidor");

  //     jest.spyOn(controller, "getBillet").mockImplementationOnce(async () => {
  //       throw mockInternalServerError;
  //     });

  //     await controller.getBillet(request as Request, response as Response);

  //     expect(response.status).toHaveBeenCalledWith(500);
  //     expect(response.json).toHaveBeenCalledWith({
  //       error: "Erro no servidor",
  //     });
  //   });
  // });
});
