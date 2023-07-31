import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public user;
  constructor(private route: ActivatedRoute, private http:HttpService){}
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
  }
}
