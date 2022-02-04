import { global } from "../../../src/shared/data/global.data";
import { Service } from "./../../../src/app/services/service";

describe("Services tests", () => {
  let service: Service;
  let codeNumber: string;

  beforeAll(() => {
    service = new Service();
    codeNumber = global.codeNumber.success;
  });

  // it("should be get scopes code number with success", () => {
  //   const response = service.validateCodeNumber(codeNumber);

  //   expect(response).toBe({
  //     status: 200,
  //     amount: "",
  //     expirationDate: "",
  //     barCode: "",
  //   });
  // });

  // it("should be get scopes code number without amount with success", () => {
  //   const response = service.validateCodeNumber(codeNumber);

  //   expect(response).toBe({
  //     status: 200,
  //     expirationDate: "",
  //     barCode: "",
  //   });
  // });

  // it("should be get scopes code number without without date with success", () => {
  //   const response = service.validateCodeNumber(codeNumber);

  //   expect(response).toBe({
  //     status: 200,
  //     amount: "",
  //     barCode: "",
  //   });
  // });

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
    codeNumber = global.codeNumber.segmentIdentificationInvalid;
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
