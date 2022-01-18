import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressType } from 'src/app/models/AddressType';
import { AddressService } from 'src/app/services/address.service';
import { samePasswordValidator } from 'src/app/shared/validators/same-password.directive';

@Component({
  selector: 'dsw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private addressService: AddressService) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    docNumber: ['', Validators.required],
    docType: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      address: ['', Validators.required],
      district: ['', Validators.required],
      uf: ['', Validators.required],
      number: ['', Validators.required],
      status: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', Validators.required],
      complemento: ['', Validators.required]
    }),
    phone: [[], [Validators.required, Validators.minLength(2)]],
    idUser: ['', Validators.required],
    user: this.fb.group({
      password: ['', Validators.required],
      passwordAgain: ['', [Validators.required]]
    }, { validators: [samePasswordValidator('password', 'passwordAgain')] })
  });

  ngOnInit() {
  }

  onSubmit(event: Event) {

    event.preventDefault();
    
    this.registerForm.markAllAsTouched();

    console.log(this.registerForm.value);
  }

  dispatchSearchZipCode() {
    const zipCode = this.registerForm.value.address?.zipCode;

    console.log('zipCode', zipCode);

    if (zipCode.length >= 8) {
      this.addressService.getAddressByZipCode(zipCode)
        .subscribe((res: { address: AddressType }) => {
          const { address } = res;

          this.registerForm
            .patchValue({
              address: {
                address: address.address,
                district: address.district,
                uf: address.uf,
                city: address.city,
                country: address.country
              }
            })
        })
    }

  }
}
