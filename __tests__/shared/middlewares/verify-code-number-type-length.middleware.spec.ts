import { NextFunction, Request, Response } from "express";
import { global } from "./../../../src/shared/data/global.data";
import { VerifyCodeNumberTypeAndLength } from "./../../../src/shared/middlewares/verify-code-number-type-length.middleware";

describe("Verify code number type and length middleware test", () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let next: NextFunction = jest.fn();
  let codeNumber: string;

  beforeEach(async () => {
    request = {};
    response = {};
  });

  it("should be type and length validation success", () => {
    request = {
      params: {
        codeNumber: global.codeNumber.success,
      },
    };

    VerifyCodeNumberTypeAndLength(
      request as Request,
      response as Response,
      next
    );

    expect(next).toBeCalledTimes(1);
  });

  it("should be failed by type (string) different of number", () => {
    request = {
      params: {
        codeNumber: global.codeNumber.textContent,
      },
    };

    function verifyMiddleware() {
      VerifyCodeNumberTypeAndLength(
        request as Request,
        response as Response,
        next
      );
    }

    expect(verifyMiddleware).toThrowError(
      "Código do boleto fora do padrão, deve conter apenas numeral"
    );
  });

  it("should be failed by length smaller of 44", () => {
    request = {
      params: {
        codeNumber: global.codeNumber.smaller44,
      },
    };

    function verifyMiddleware() {
      VerifyCodeNumberTypeAndLength(
        request as Request,
        response as Response,
        next
      );
    }

    expect(verifyMiddleware).toThrowError(
      "Código do boleto fora do padrão, tamanho diferente inválido"
    );
  });

  it("should be failed by length larger of 48", () => {
    request = {
      params: {
        codeNumber: global.codeNumber.larger48,
      },
    };

    function verifyMiddleware() {
      VerifyCodeNumberTypeAndLength(
        request as Request,
        response as Response,
        next
      );
    }

    expect(verifyMiddleware).toThrowError(
      "Código do boleto fora do padrão, tamanho diferente inválido"
    );
  });
});
