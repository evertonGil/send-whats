import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dsw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    docNumber: ['', Validators.required],
    docType: ['', Validators.required],
    email: ['', Validators.required],
    address: this.fb.group({
      address: ['', Validators.required],
      district: ['', Validators.required],
      uf: ['', Validators.required],
      number: ['', Validators.required],
      status: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      complemento: ['', Validators.required]
    }),
    phone: [[], Validators.required, Validators.minLength(2)],
    idUser: ['', Validators.required],
    user: this.fb.group({
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    })
  });

  passwordStrength = 'fraca';

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onSubmit(event: Event) {

    event.preventDefault();

    console.log(this.registerForm.value);
  }
}
