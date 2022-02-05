import { global } from "../../../src/shared/data/global.data";
import { Service } from "./../../../src/app/services/service";

describe("Services tests", () => {
  let service: Service;
  let codeNumber: string;

  beforeAll(() => {
    service = new Service();
  });

  describe("success", () => {
    it("should be get scopes code and validate code number number with success", () => {
      codeNumber = global.codeNumber.success.valid;
      const response = service.validateCodeNumber(codeNumber);

      expect(response).toStrictEqual({
        amount: "504.82",
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code and validate code number number without amount with success", () => {
      codeNumber = global.codeNumber.success.withOutValue;
      const response = service.validateCodeNumber(codeNumber);
      delete response.amount; // por não conter um valor válido no código de barras

      expect(response).toStrictEqual({
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code and validate code number number without date with success", () => {
      codeNumber = global.codeNumber.success.withOutDate;
      const response = service.validateCodeNumber(codeNumber);
      delete response.expirationDate; // por não conter uma data válida no código de barras

      expect(response).toStrictEqual({
        amount: "504.82",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code and validate code number number larger 48 and module 10 with success", () => {
      codeNumber = global.codeNumber.success.larger48Module10Valid;
      const response = service.validateCodeNumber(codeNumber);

      expect(response).toStrictEqual({
        amount: "504.82",
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    it("should be get scopes code and validate code number number larger 48 and module 11 with success", () => {
      codeNumber = global.codeNumber.success.larger48Module11Valid;
      const response = service.validateCodeNumber(codeNumber);

      expect(response).toStrictEqual({
        amount: "504.82",
        expirationDate: "2023-02-03",
        barCode: codeNumber,
      });
    });

    describe("segment identification", () => {
      it("should be get scopes code number and validate code numberwith segment identification one", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.one;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification two", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.two;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification three", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.three;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification four", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.four;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification five", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.five;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification six", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.six;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification seven", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.seven;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith segment identification nine", () => {
        codeNumber = global.codeNumber.success.segmentIdentification.nine;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });
    });

    describe("identification value effective or reference", () => {
      it("should be get scopes code number and validate code numberwith identification value effective or reference six", () => {
        codeNumber =
          global.codeNumber.success.identificationValueEffectiveOrReference.six;
        const response = service.validateCodeNumber(codeNumber);
        delete response.amount; // pelo o Identificador de Valor ser do tipo Efetivo

        expect(response).toStrictEqual({
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith identification value effective or reference seven", () => {
        codeNumber =
          global.codeNumber.success.identificationValueEffectiveOrReference
            .seven;
        const response = service.validateCodeNumber(codeNumber);

        expect(response).toStrictEqual({
          amount: "504.82",
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith identification value effective or reference eight", () => {
        codeNumber =
          global.codeNumber.success.identificationValueEffectiveOrReference
            .eight;
        const response = service.validateCodeNumber(codeNumber);
        delete response.amount; // pelo o Identificador de Valor ser do tipo Efetivo

        expect(response).toStrictEqual({
          expirationDate: "2023-02-03",
          barCode: codeNumber,
        });
      });

      it("should be get scopes code number and validate code numberwith identification value effective or reference nine", () => {
        codeNumber =
          global.codeNumber.success.identificationValueEffectiveOrReference
            .nine;
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
    it("should be not validate code number by product indentification scope invalid", () => {
      codeNumber = global.codeNumber.invalid.productIndentification;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificação do Produto inválido"
      );
    });

    it("should be not validate code number by segment identification scope invalid", () => {
      codeNumber = global.codeNumber.invalid.segmentIdentification;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificação de Segmento inválido"
      );
    });

    it("should be not validate code number by identification value effective or reference invalid", () => {
      codeNumber =
        global.codeNumber.invalid.identificationValueEffectiveOrReference;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número de Identificador de Valor Efetivo ou Referência inválido"
      );
    });

    it("should be not validate code number by verify digit (module 10) invalid", () => {
      codeNumber = global.codeNumber.invalid.verifyDigitModule10;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número do Dígito Verificador inválido"
      );
    });

    it("should be not validate code number by verify digit (module 11) invalid", () => {
      codeNumber = global.codeNumber.invalid.verifyDigitModule11;
      function verifyFunction() {
        service.validateCodeNumber(codeNumber);
      }

      expect(verifyFunction).toThrowError(
        "Código do boleto fora do padrão, número do Dígito Verificador inválido"
      );
    });
  });
});
