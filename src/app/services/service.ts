import { IdentificationValueOrReference } from "../../shared/enums/identification-value-reference.enums";
import { SegmentIdentification } from "../../shared/enums/segment-identification.enums";
import { BadRequestError } from "./../../shared/helpers/response/error.response";

export class Service {
  public async validateCodeNumber(codeNumber: string) {
    const splittedCodeNumber = codeNumber.split("");
    const {
      cnpjOrMfNumber,
      companyOrOrganIdentificationNumber,
      freeFieldUseByCompanyOrOrganNumber,
      identificationValueEffectiveOrReferenceNumber,
      productIndentificationNumber,
      segmentIdentificationNumber,
      value,
      verifyingDigit,
    } = this.getScopesByCodeNumber(splittedCodeNumber);

    this.productIndentificationScope(productIndentificationNumber);
    const companyOrOrgan = this.segmentIdentificationScope(
      segmentIdentificationNumber
    );
    const identification = this.identificationValueEffectiveOrReferenceScope(
      identificationValueEffectiveOrReferenceNumber
    );
    this.verifyingDigitScope(verifyingDigit, identification, codeNumber);
    const valueEffectiveOrReference = this.valueScope(value, identification);

    return {
      input: { codeNumber },
      output: {
        codeInfo: {
          cnpjOrMfNumber,
          companyOrOrganIdentificationNumber,
          freeFieldUseByCompanyOrOrganNumber,
          identificationValueEffectiveOrReferenceNumber,
          productIndentificationNumber,
          segmentIdentificationNumber,
          value,
          verifyingDigit,
        },
        extras: {
          companyOrOrgan,
          identification,
          valueEffectiveOrReference,
        },
      },
    };
  }

  private getScopesByCodeNumber(codeNumberList: string[]) {
    let productIndentificationNumber = "",
      segmentIdentificationNumber = "",
      identificationValueEffectiveOrReferenceNumber = "",
      verifyingDigit = "",
      value = "",
      companyOrOrganIdentificationNumber = "",
      freeFieldUseByCompanyOrOrganNumber = "",
      cnpjOrMfNumber = "";

    codeNumberList.forEach((number, index) => {
      if (index === 0) {
        productIndentificationNumber += number;

        return;
      }

      if (index === 1) {
        segmentIdentificationNumber += number;

        return;
      }

      if (index === 2) {
        identificationValueEffectiveOrReferenceNumber += number;

        return;
      }

      if (index === 3) {
        verifyingDigit += number;

        return;
      }

      if (index >= 4 && index <= 14) {
        value += number;

        return;
      }

      if (index >= 15) {
        if (identificationValueEffectiveOrReferenceNumber === "6") {
          if (index <= 22) {
            cnpjOrMfNumber += number;

            return;
          }
        }

        if (index <= 18) {
          companyOrOrganIdentificationNumber += number;

          return;
        }

        if (index >= 19 && index <= 43) {
          freeFieldUseByCompanyOrOrganNumber += number;

          return;
        }
      }
    });

    return {
      productIndentificationNumber,
      segmentIdentificationNumber,
      identificationValueEffectiveOrReferenceNumber,
      verifyingDigit,
      value,
      companyOrOrganIdentificationNumber,
      freeFieldUseByCompanyOrOrganNumber,
      cnpjOrMfNumber,
    };
  }

  private productIndentificationScope(productNumber: string) {
    if (productNumber !== "8") {
      throw new BadRequestError(
        "Código do boleto fora do padrão, número de Identificação do Produto inválido"
      );
    }
  }

  private segmentIdentificationScope(segmentIdentification: string) {
    let companyOrOrgan: string;

    switch (segmentIdentification) {
      case "1":
        companyOrOrgan = SegmentIdentification._1;
        break;
      case "2":
        companyOrOrgan = SegmentIdentification._2;
        break;
      case "3":
        companyOrOrgan = SegmentIdentification._3;
        break;
      case "4":
        companyOrOrgan = SegmentIdentification._4;
        break;
      case "5":
        companyOrOrgan = SegmentIdentification._5;
        break;
      case "6":
        companyOrOrgan = SegmentIdentification._6;
        break;
      case "7":
        companyOrOrgan = SegmentIdentification._7;
        break;
      case "9":
        companyOrOrgan = SegmentIdentification._9;
        break;
      default:
        throw new BadRequestError("");
    }

    return companyOrOrgan;
  }

  private identificationValueEffectiveOrReferenceScope(
    identificationValueOrReferenceNumber: string
  ) {
    let identification: string;

    switch (identificationValueOrReferenceNumber) {
      case "6":
        identification = IdentificationValueOrReference._6;
        break;
      case "7":
        identification = IdentificationValueOrReference._7;
        break;
      case "8":
        identification = IdentificationValueOrReference._8;
        break;
      case "9":
        identification = IdentificationValueOrReference._9;
        break;
      default:
        throw new BadRequestError(
          "Código do boleto fora do padrão, número de Identificador de Valor Efetivo ou Referência inválido"
        );
    }

    return identification;
  }

  private verifyingDigitScope(
    verifyingDigit: string,
    identification: string,
    code: string
  ) {
    let moduleDigit: string;
    const isModule10 = this.verifyIdentificationModule(identification);

    if (isModule10) {
      moduleDigit = this.calculateByModule10(code);
    } else {
      moduleDigit = this.calculateByModule11(code);
    }

    this.verifyDigitEqualModuleCodeDigit(verifyingDigit, moduleDigit);
  }

  private verifyIdentificationModule(identification: string) {
    if (identification.toLowerCase().includes("módulo 10")) {
      return true;
    }

    if (identification.toLowerCase().includes("módulo 11")) {
      return false;
    }
  }

  private calculateByModule10(code: string) {
    let result = 0;
    let aux = 0;
    const splittedCode = code.split("");

    splittedCode.reverse().forEach((c, index) => {
      let digit = +c;

      if (splittedCode.length === 48) {
        // mudar
        if (["0", "1", "2", "3"].includes(index.toString())) return;
      } else {
        if (["40"].includes(index.toString())) return;
      }

      if (aux % 2 === 0) {
        result = this.calcResultNumber(result, digit, 2);
        aux = 1;

        return;
      }

      result = this.calcResultNumber(result, digit, 1);
      aux = 0;
    });

    result = result % 10;

    if (result.toString() === "0") {
      result = 0;
    } else {
      result = 10 - result;
    }

    return result.toString();
  }

  private calculateByModule11(code: string) {
    let result = 0;
    let numberOfModuleList = [2, 3, 4, 5, 6, 7, 8, 9];
    let numberModule: number;
    const splittedCode = code.split("");
    let position = splittedCode.length % numberOfModuleList.length;
    numberModule = numberOfModuleList[position - 1];

    splittedCode.forEach((c, index) => {
      if (splittedCode.length === 48) {
        // mudar
        if (["0", "1", "2", "3"].includes(index.toString())) return;
      } else {
        if (["40"].includes(index.toString())) return;
      }

      let digit = +c;

      if (numberModule.toString() === "2") {
        result = this.calcResultNumber(result, digit, numberModule);

        numberModule = numberOfModuleList[numberOfModuleList.length - 1];

        return;
      }

      result = this.calcResultNumber(result, digit, numberModule);
      position = numberOfModuleList.findIndex(
        (number) => number === numberModule
      );
      numberModule = numberOfModuleList[position - 1];
    });

    result = result % 11;

    if (result.toString() === "0" || result.toString() === "1") {
      result = 0;
    }

    if (result.toString() === "10") {
      result = 1;
    } else {
      result = 11 - result;
    }

    return result.toString();
  }

  private calcResultNumber(result: number, digit: number, seq: number) {
    let resultLength: string | string[];
    let resultCalc: number;

    resultCalc = seq * digit;
    resultLength = resultCalc.toString().split("");
    resultLength.forEach((r) => {
      let resultDigit = +r;
      result += resultDigit;
    });

    return result;
  }

  private verifyDigitEqualModuleCodeDigit(
    codeDigit: string,
    moduleDigit: string
  ) {
    if (codeDigit !== moduleDigit) {
      throw new BadRequestError(
        "Código do boleto fora do padrão, número do Dígito Verificador inválido"
      );
    }
  }

  private valueScope(value: string, identification: string) {
    let valueBillet: string;

    if (identification.toLowerCase().includes("moeda")) {
      valueBillet = value;

      return valueBillet;
    }
  }
}
