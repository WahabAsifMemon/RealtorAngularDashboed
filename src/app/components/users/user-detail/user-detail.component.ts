import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public user;
  public appointment  : [] = [];
  public appointmentLength:number = 0;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;

  // constructor(
  //   private http: HttpService,
  //   private router: Router,
  //   private fb: FormBuilder
  // ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });



  constructor(private route: ActivatedRoute, private http:HttpService,  private fb: FormBuilder){}
  ngOnInit() {
    this.route.params.subscribe(params => {
      let userId = params['id'];
      this.loadData(userId)
    });
  }
  async loadData(id:any) {
    await Promise.all([this.getUser(id)]);
  }

  async getUser(id:any) {
    try {
      const res: any = await this.http.get(`user/${id}`, true).toPromise();
      this.user = res?.user;
      console.log(res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    try {
      const res: any = await this.http.get(`appointment/${id}`, true).toPromise();
      this.appointment = res?.appointments;
      this.appointmentLength = res?.appointments?.length;
      console.log(res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }



  
}
