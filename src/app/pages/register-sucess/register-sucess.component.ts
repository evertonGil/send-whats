import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { AddressType } from 'src/app/models/AddressType';
import { AddressService } from 'src/app/services/address.service';
import { ClientService } from 'src/app/services/client.service';
import { MultiInputValidators } from 'src/app/shared/multi-input-list/multi-input-validator.directive';
import { samePasswordValidator } from 'src/app/shared/validators/same-password.directive';

@Component({
  selector: 'dsw-register',
  templateUrl: './register-sucess.component.html',
  styleUrls: ['./register-sucess.component.scss']
})
export class RegisterSucessComponent implements OnInit {

  constructor(private fb: FormBuilder, private addressService: AddressService, private clienService: ClientService, private toastr: ToastrService) { }  

  ngOnInit() {
  }
}
