import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public errorMessage: any;
  public loginForm: any = this.fb.group({
    email: ['davidjohndev1@gmail.com', [Validators.required, Validators.email]],
    password: ['uber1234', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService,
  ) {
  }

  ngOnInit() { }

  showPassword() {
    this.show = !this.show;
  }
  login() {
    this.http.post('auth/login', this.loginForm.value, false).subscribe((res: any) => {
      console.log(res, "helloresss");
      localStorage.setItem('token', JSON.stringify(res?.token))
      this.router.navigate(['/users'])
    })
  }
}
