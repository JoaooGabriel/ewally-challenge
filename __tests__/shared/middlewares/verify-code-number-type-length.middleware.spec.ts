import { NextFunction, Request, Response } from "express";
import { VerifyCodeNumberTypeAndLength } from "./../../../src/shared/middlewares/verify-code-number-type-length.middleware";

describe("Verify code number type and length middleware test", () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let next: NextFunction = jest.fn();
  let codeNumber: string;

  beforeEach(async () => {
    request = {};
    response = {};
    codeNumber = "846100000005246100291102005460339004695895061080";
  });

  it("should be type and length validation success", () => {
    request = {
      params: {
        codeNumber,
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
    codeNumber = "codeNumber123";
    request = {
      params: {
        codeNumber,
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
    codeNumber = "123";
    request = {
      params: {
        codeNumber,
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
    codeNumber += "1";
    request = {
      params: {
        codeNumber,
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
