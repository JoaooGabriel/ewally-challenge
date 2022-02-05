import { global } from "../../../src/shared/data/global.data";
import { Service } from "./../../../src/app/services/service";

describe("Services tests", () => {
  let service: Service;
  let codeNumber: string;

  beforeAll(() => {
    service = new Service();
  });

  describe("success", () => {
    it("should be get scopes code number with success", () => {
      codeNumber = global.codeNumber.success;
      const response = service.validateCodeNumber(codeNumber);

      expect(response).toStrictEqual({
        amount: "504.82",
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code number without amount with success", () => {
      codeNumber = global.codeNumber.withOutValue;
      const response = service.validateCodeNumber(codeNumber);

      delete response.amount;

      expect(response).toStrictEqual({
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code number without date with success", () => {
      codeNumber = global.codeNumber.withOutDate;
      const response = service.validateCodeNumber(codeNumber);

      delete response.expirationDate;

      expect(response).toStrictEqual({
        amount: "504.82",
        barCode: codeNumber,
      });
    });

    describe("segment identification", () => {
      it("should be get scopes code number with segment identification one", () => {
        codeNumber = global.codeNumber.segmentIdentification.one;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification two", () => {
        codeNumber = global.codeNumber.segmentIdentification.two;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification three", () => {
        codeNumber = global.codeNumber.segmentIdentification.three;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification four", () => {
        codeNumber = global.codeNumber.segmentIdentification.four;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification five", () => {
        codeNumber = global.codeNumber.segmentIdentification.five;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification six", () => {
        codeNumber = global.codeNumber.segmentIdentification.six;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification seven", () => {
        codeNumber = global.codeNumber.segmentIdentification.seven;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number with segment identification nine", () => {
        codeNumber = global.codeNumber.segmentIdentification.nine;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });
    });
  });

  describe("error", () => {
    it("should be not get scopes code number by product indentification scope invalid", () => {
      codeNumber = global.codeNumber.productIndentificationInvalid;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificação do Produto inválido"
      );
    });

    it("should be not get scopes code number by segment identification scope invalid", () => {
      codeNumber = global.codeNumber.segmentIdentification.invalid;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificação de Segmento inválido"
      );
    });

    it("should be not get scopes code number by identification value effective or reference invalid", () => {
      codeNumber =
        global.codeNumber.identificationValueEffectiveOrReferenceinvalid;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificador de Valor Efetivo ou Referência inválido"
      );
    });

    it("should be not get scopes code number by verify digit (module 10) invalid", () => {
      codeNumber = global.codeNumber.verifyDigitModule10Invalid;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número do Dígito Verificador inválido"
      );
    });

    it("should be not get scopes code number by verify digit (module 11) invalid", () => {
      codeNumber = global.codeNumber.verifyDigitModule11Invalid;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número do Dígito Verificador inválido"
      );
    });
  });
});
