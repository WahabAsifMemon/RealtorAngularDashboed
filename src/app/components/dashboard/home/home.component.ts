import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpService) {}

  public users: number = 0;
  public history: number = 0;

  ngOnInit() {
    this.loadData();
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  async loadData() {
    await Promise.all([this.getUsers(), this.getHistory()]);
  }

  async getUsers() {
    try {
      const res: any = await this.http.get('users', true).toPromise();
      console.log(res);
      this.users = res?.user?.length || 0;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async getHistory() {
    try {
      const res: any = await this.http.get('history', true).toPromise();
      console.log(res);
      this.history = res?.history?.length || 0;
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  }
}
