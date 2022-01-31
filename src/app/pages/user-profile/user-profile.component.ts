import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AddressType } from 'src/app/models/AddressType';
import { ClientApiType, ClientStoreType } from 'src/app/models/ClientType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { updateClient } from 'src/app/redux/actions/client.action';
import { selectClient } from 'src/app/redux/selectors.store';
import { AddressService } from 'src/app/services/address.service';
import { ClientService } from 'src/app/services/client.service';
import { MultiInputValidators } from 'src/app/shared/multi-input-list/multi-input-validator.directive';
import { samePasswordValidator } from 'src/app/shared/validators/same-password.directive';

@Component({
  selector: 'dsw-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  client: ClientStoreType;
  openPassword: boolean = false;
  openFormRegister: boolean = false;

  constructor(
    private store: Store,
    private addressService: AddressService,
    private toastr: ToastrService,
    private clienService: ClientService,
    private fb: FormBuilder
  ) {
  }

  registerForm = this.fb.group({
    id: ['', Validators.required],
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
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', Validators.required],
      complemento: ['']
    }),
    phone: [[], [Validators.required, MultiInputValidators.minItemValidator(1)]]
  });

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required]
  })

  ngOnInit() {
    this.store.select(selectClient).subscribe(data => {
      this.client = data;

      this.fillForm(this.client);
    });

    this.registerForm.disable();
  }

  fillForm(client: ClientStoreType) {
    this.registerForm.patchValue({
      id: client.name,
      name: client.name,
      lastName: client.lastName,
      docNumber: client.docNumber,
      docType: client.docType,
      email: client.email,
      address: client.address,
      phone: client.phone
    })
  }

  toggleRegister() {

    if (!this.openFormRegister) {
      this.registerForm.enable();
    } else {
      this.registerForm.disable();
    }

    this.openFormRegister = !this.openFormRegister;
  }

  togglePassword() {
    this.openPassword = !this.openPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {

      const {role, id, login} = this.client.user;

      const clientNew = {
        ...this.client,
        ...this.registerForm.value,
        user:{
          role, id, login
        }
      }
      
      console.log('clientNew', clientNew);

      this.clienService.update(clientNew)
        .pipe(catchError(error => {

          this.toastr.error('Não foi possivel finalizar seu cadastro, por favor entre em contato com o suporte!');

          return error;
        }))
        .subscribe((res: ReponseWrapper<{ client: ClientApiType }>) => {
          this.toastr.success('Dados alterados com sucesso!');
          this.toggleRegister();

          this.store.dispatch(updateClient(res.client));
        });

    } else {
      this.toastr.error('Por favor, corrija os erros no formulário!');
    }
  }

  onSubmitPassword(event: Event) {
    event.preventDefault();
    this.passwordForm.markAllAsTouched();
    console.log(this.passwordForm.value);
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
            });
        })
    }

  }

}
