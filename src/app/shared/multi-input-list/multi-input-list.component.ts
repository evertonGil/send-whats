import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Random } from '../helpers/random';

@Component({
  selector: 'dsw-multi-input-list',
  templateUrl: './multi-input-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./multi-input-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiInputListComponent),
      multi: true
    }]
})
export class MultiInputListComponent implements ControlValueAccessor {
  @Input() idGroup: string;
  @Input() classInput: string;
  @Input() placeholder: string;
  @Input() type: string;
  @ViewChild('form') groupForm: NgForm;

  disabled: boolean;

  _val = {};
  list_inputs = [];

  lastIndex = 0;
  onChange: (_: any) => void
  onTouched: () => void

  get _length() {
    return Object.keys(this._val).length
  }

  constructor(private cd: ChangeDetectorRef, private appRef: ApplicationRef) {
    this.newInput(Random.makeNewKey(5, this.lastIndex), "")
   }

  addNewInput() {
    this.lastIndex++;
    this.newInput(Random.makeNewKey(5, this.lastIndex), "")
    console.log(this._val, this.groupForm);
    this.dispatchChange();
  }

  newInput(key: string, value: string){
      this._val[key] = value;
      this.list_inputs.push(key);
  }

  resetInputs(){
    this._val = {};
    this.list_inputs = [];
  }

  removeInput(key) {
    delete this._val[key];
    this.dispatchChange();
  }

  writeValue(array: string[]): void {
    if (Array.isArray(array)) {
      if (!array.length) {
        array.push("");
      }

      this.resetInputs();

      array.forEach((item, i) => {
        this.lastIndex = i;
        this.newInput(Random.makeNewKey(5, this.lastIndex), item);
      });

    } else {
      throw new Error("O valor do MultiInputListComponent deve ser um array")
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  dispatchChange() {
    this.onChange(Object.values(this._val))
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  dispatchTouch() {
    this.onTouched()
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
