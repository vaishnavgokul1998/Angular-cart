import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounce, interval, Subject, takeUntil, timer } from 'rxjs';
import { ERROR_MESSAGES } from 'src/app/app.constants';
import { ResponseStatus } from 'src/app/models/response';
import { AuthService } from 'src/app/service/auth.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { LogOut, SetToken } from 'src/app/store/app.action';
import { LoginRequest } from '../../models/login/login.request.model';
import { LoginResposeModel, UserDetailModel } from '../../models/login/login.response.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide: boolean = true;
  loginForm !: FormGroup

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
    this.authService.logOut();
    this.destroy$ = new Subject<void>()

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    })
  }
  onSubmit() {
    const body: LoginRequest = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value
    }
    this.spinner.show();
    this.restApiService.login(body)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          let result: LoginResposeModel = response;
          this.signupResponseMsg = result.responseCode.message;
          if (result.responseCode.code == ResponseStatus.SUCCESS) {
            this.showTipType = "success";
            this.restApiService.getUserDetails().subscribe(res=>{
              this.router.navigateByUrl('home');

            })
          } else {
            this.showTipType = "error";
          }
        },
        error: (res) => {
          this.spinner.hide()
          this.showTipMsg = true
        },
        complete: () => {
          this.spinner.hide()
          this.showTipMsg = true
        }
      });

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
