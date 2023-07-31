import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getUsers()]);
  }

  async getUsers() {
    try {
      const res: any = await this.http.get('users', true).toPromise();
      console.log(res);
      this.users = res?.user;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async userDetail(id) {
    this.router.navigateByUrl(`/users/user/${id}`); // Remove the colon from the parameter
  }
  async stateItem(event: any, data: any) {
    const { id } = event || {};
    await this.userForm.patchValue({
      id: id,
      status: data.target.checked ? 1 : 0,
    });
    await this.save()
  }
  async save(){
    await this.http.post('user-update',this.userForm.value,true).subscribe((res:any)=>{
      console.log(res);
      this.getUsers();
    })
  }
}
