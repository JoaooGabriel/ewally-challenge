import { IdentificationValueOrReference } from "../../shared/enums/identification-value-reference.enums";
import { SegmentIdentification } from "../../shared/enums/segment-identification.enums";
import { BadRequestError } from "./../../shared/helpers/response/error.response";

export class Service {
  public async validateCodeNumber(codeNumber: string) {
    const splittedCodeNumber = codeNumber.split("");

    const {
      cnpjOrMfNumber,
      companyOrOrganIdentificationNumber,
      freeFieldNumber,
      freeFieldUseByCompanyOrOrganNumber,
      identificationValueOrReferenceNumber,
      productIndentificationNumber,
      segmentIdentificationNumber,
      value,
      verifyingDigit,
    } = this.getScopesByCodeNumber(splittedCodeNumber);
    this.productIndentificationScope(productIndentificationNumber);
    const companyOrOrgan = this.segmentIdentificationScope(
      segmentIdentificationNumber
    );
    const identification = this.identificationValueOrReferenceScope(
      identificationValueOrReferenceNumber
    );
    this.verifyingDigitScope(verifyingDigit, identification, codeNumber);

    return {
      input: { codeNumber },
      output: {
        codeInfo: {
          cnpjOrMfNumber,
          companyOrOrganIdentificationNumber,
          freeFieldNumber,
          freeFieldUseByCompanyOrOrganNumber,
          identificationValueOrReferenceNumber,
          productIndentificationNumber,
          segmentIdentificationNumber,
          value,
          verifyingDigit,
        },
        extras: {
          companyOrOrgan,
          identification,
        },
      },
    };
  }

  private getScopesByCodeNumber(codeNumberList: string[]) {
    let productIndentificationNumber = "",
      segmentIdentificationNumber = "",
      identificationValueOrReferenceNumber = "",
      verifyingDigit = "",
      value = "",
      companyOrOrganIdentificationNumber = "",
      freeFieldUseByCompanyOrOrganNumber = "",
      cnpjOrMfNumber = "",
      freeFieldNumber = "";

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
        identificationValueOrReferenceNumber += number;

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

      if (index >= 15 && index <= 18) {
        companyOrOrganIdentificationNumber += number;
        cnpjOrMfNumber += number;

        return;
      }

      if (index >= 19 && index <= 43) {
        freeFieldUseByCompanyOrOrganNumber += number;

        if (index <= 22) {
          cnpjOrMfNumber += number;
        }

        if (index >= 23) {
          freeFieldNumber += number;
        }

        return;
      }
    });

    return {
      productIndentificationNumber,
      segmentIdentificationNumber,
      identificationValueOrReferenceNumber,
      verifyingDigit,
      value,
      companyOrOrganIdentificationNumber,
      freeFieldUseByCompanyOrOrganNumber,
      cnpjOrMfNumber,
      freeFieldNumber,
    };
  }

  private productIndentificationScope(productNumber: string) {
    if (productNumber !== "8") {
      throw new BadRequestError("");
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

  private identificationValueOrReferenceScope(
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
        throw new BadRequestError("");
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
    const splittedCode = code.split("");

    splittedCode.forEach((c, index) => {
      let digit = +c;

      if (index % 2 === 0) {
        result = result + 2 * digit;
      }

      result = result + 1 * digit;
    });

    result = result % 10;
    result = 10 - result;

    return result.toString();
  }

  private calculateByModule11(code: string) {
    return "";
  }

  private verifyDigitEqualModuleCodeDigit(
    codeDigit: string,
    moduleDigit: string
  ) {
    if (!codeDigit.includes(moduleDigit)) {
      throw new BadRequestError("");
    }
  }
}
