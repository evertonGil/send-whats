import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Random } from '../helpers/random';

@Component({
  selector: 'dsw-multi-input-list',
  templateUrl: './multi-input-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @ViewChild('f') courseForm: NgForm;

  disabled: boolean;
  _val = {
    [Random.makeNewKey(5)]: ''
  };
  lastIndex = 0;
  onChange: (_: any) => void
  onTouched: () => void

  get _length() {
    return Object.keys(this._val).length
  }

  constructor(private cd: ChangeDetectorRef, private appRef: ApplicationRef) { }

  addNewInput() {
    this.lastIndex++;
    const key = Random.makeNewKey(5, this.lastIndex);
    this._val[key] = "";
    console.log(this._val);
    this.dispatchChange();
    this.cd.detectChanges();
  }

  removeInput(key) {
    delete this._val[key];
    this.dispatchChange();
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    console.log('antes', this.appRef.viewCount)
    this.cd.detach();
    console.log('depois', this.appRef.viewCount)
  }

  writeValue(array: string[]): void {
    if (Array.isArray(array)) {
      if (!array.length) {
        array.push("");
      }

      this._val = {};
      array.forEach((item, i) => {
        this.lastIndex = i;
        this._val[i] = item
      });

      this.cd.detectChanges();

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
