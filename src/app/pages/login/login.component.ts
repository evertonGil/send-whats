import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "dsw-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  employeeDetailsForm = this.fb.group({
    email: [''],
    password: ['']
  });
  
  get passwordInputType () {
    const passwordInput = this.passwordInput?.nativeElement;
    return passwordInput?.type;
  }

  set passwordInputType(value: string) {
    const passwordInput = this.passwordInput?.nativeElement;
    passwordInput.type = value;
  }

  get passwordInputIcon() {
    return this.passwordInputType == 'text' ? 'far fa-eye-slash' : 'far fa-eye';
  }

  ngOnInit() {}
  ngOnDestroy() {}

  tooglePassword() {
    if(this.passwordInputType == "password"){
      this.passwordInputType = "text";
    } else {
      this.passwordInputType = "password";
    }
  }

  signIn(event: Event) {
    event.preventDefault();
    
    console.log('Login')
    this.authService.signIn().subscribe((res) => {
      if (res) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
