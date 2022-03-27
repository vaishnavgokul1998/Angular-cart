import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil, timer } from 'rxjs';
import { ERROR_MESSAGES, ROLES } from 'src/app/app.constants';
import { LoginRequest } from 'src/app/models/login/login.request.model';
import { Response, ResponseStatus } from 'src/app/models/response';
import { SignupRequest } from 'src/app/models/signup/signup.request.model';
import { AuthService } from 'src/app/service/auth.service';
import { LogOut } from 'src/app/store/app.action';
import { RestApiService } from '../../service/rest-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  hide: boolean = true;
  signupForm !: FormGroup

  errors = ERROR_MESSAGES;

  destroy$!: Subject<void>;

  showTipMsg: boolean = false;
  showTipType: string = "default";

  signupResponseMsg: string = "";

  constructor(
    private restApiService: RestApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>()

    this.signupForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      mobileNo: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", { validators: [Validators.required, this.checkPasswords] }),
      role: new FormControl(ROLES.USER),
    })
  }

  onSubmit() {
    this.signupForm.removeControl('confirmPassword')

    let signUpReqModel: SignupRequest = this.signupForm.value

    this.spinner.show()
    
    this.restApiService.signUp(signUpReqModel).pipe(
      takeUntil(this.destroy$)
    ).subscribe(({
      next: (response) => {
        let result: Response = response;
        this.signupResponseMsg = result.responseCode.message;
        if (result.responseCode.code == ResponseStatus.SUCCESS) {
          this.showTipType = "success";
          timer(300).subscribe(() => {
            let loginReq: LoginRequest = {
              email: signUpReqModel.email,
              password: signUpReqModel.password
            }
            this.restApiService.login(loginReq).pipe(
              takeUntil(this.destroy$)
            ).subscribe(res => {
              this.signupForm.reset();
              this.router.navigateByUrl('home')
            })
          })
        } else {
          this.showTipType = "error"
        }
        this.showTipMsg = true
        this.spinner.hide();
      },
      error: (e) => {
        this.showTipMsg = true
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    }))
  }

  changeEvent(event: MatDatepickerInputEvent<Date>) {
    this.signupForm.patchValue({ dob: this.convert(this.signupForm.get('dob')?.value) })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = this.signupForm?.get('password')?.value;
    let confirmPass = this.signupForm?.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName]?.hasError(errorName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
