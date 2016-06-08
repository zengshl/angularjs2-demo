import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/common';
import { BaseValidation, ValidationMessages, IFieldValidation, IFieldValidatorResult } from 'ng2-validate/core';
import { HasValue, IsPattern, MaxLength } from 'ng2-validate/logic';

// define an interface for configuration
export interface IMobileValidationConfig {
  required: boolean,
  //maxLength: number,
  pattern: RegExp;
}

/**
 * create a class that can be imported into a component. This one:
 * extends from the built in BaseValidation class which handles configuration defaulting.
 * implements IFieldValidation which helps standardize validation access and return types
 */
export class MobileValidation extends BaseValidation<IMobileValidationConfig> implements IFieldValidation {

  // accept a configuration. any unspecified values will be defaulted based on getDefaultConfig()
  constructor(config?: IMobileValidationConfig) {
    super(config);
  }

  // returns a function that yields a result equivalent to angular2's ValidatorFn (ValidatorFn is not public)
  public get validator(): (control: AbstractControl) => IFieldValidatorResult {

    return (control: AbstractControl): IFieldValidatorResult => {

      // create a ValidationMessages list
      let result: ValidationMessages = new ValidationMessages();

      // Determine if a value is present. If not, determine if it is required. If required, add a message
      //  if(!control.pristine) {

      if (HasValue.check(control) == false) {
        if (this.config.required) {
          result.addMessage('required', `手机号不能为空！`, this.config);
        }
      }
      else {

        // If a value is present to be validated, check the length and pattern
        //if (MaxLength.check(control, this.config.maxLength) === false) {
        //  result.addMessage('maxLength', `手机号超过 ${this.config.maxLength} 个字符`, this.config);
        //}

        if (IsPattern.check(control, this.config.pattern) === false) {
          result.addMessage('isMobile', `手机号格式不正确！`, this.config);
        }
      }
      //}

      // resolve the list
      return result.resolve();
    }
  }

  // implementation of abstract function in BaseValidation
  public getDefaultConfig(): IMobileValidationConfig {
    return MobileValidation.defaultConfig;
  }

  // static access to a default configuration
  public static get defaultConfig(): IMobileValidationConfig {
    return {
      required: true,
      //maxLength: 13,
      pattern:/^[1][358][0-9]{9}$/
    }
  }
}
