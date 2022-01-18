import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { InputRefDirective } from './input-ref.directive';
import { MESSAGE_MAP } from './message-map-default';

@Component({
  selector: 'dsw-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent implements OnInit {
  @Input() for: string;
  @Input() label: string;
  @Input() iconAddon: string;
  @Input() showAppend: boolean;
  @Input() errorMsgMap: {[key: string]: string}

  @ContentChild(InputRefDirective)
  InputRef: InputRefDirective;
  valid = false;
  touched = false;
  _errorMsgMap: {[key: string]: string}

  constructor() {
   }

  ngOnInit(): void {
    this._errorMsgMap = {
      ...MESSAGE_MAP,
      ...this.errorMsgMap
    }
  }

  get inputControl(){
    return this.InputRef?.control
  }

  ngAfterViewInit(): void {
    
    const inputHtml: HTMLInputElement = this.InputRef?.el?.nativeElement;
    
    console.log("input", inputHtml.id, this.InputRef);
    
    this.inputControl?.statusChanges.subscribe(status => {
      this.valid = this.inputControl.valid;
      this.touched = this.inputControl.touched;
    });

    inputHtml?.addEventListener('blur', _ => {
      this.touched = this.inputControl.touched;
    })

  }
}
