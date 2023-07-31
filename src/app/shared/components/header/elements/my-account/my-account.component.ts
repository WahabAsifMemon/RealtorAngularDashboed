import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  constructor(private router: Router, private http:HttpService) { }
  ngOnInit() {
  }
  async logoutUser() {
    await this.http.post('admin/logout', {}, true).subscribe((res: any) => {
      console.log(res);
      localStorage.clear();
      this.router.navigateByUrl('auth/login');
    });
  }
}
