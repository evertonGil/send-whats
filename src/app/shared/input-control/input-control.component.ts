import { Component, Input, OnInit, ViewChild } from '@angular/core';

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
  @ViewChild('refInput') refInput;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
  }
}
