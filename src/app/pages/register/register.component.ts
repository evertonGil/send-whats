import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  passwordStrength = 'fraca';

  ngOnInit() {
  }

}
