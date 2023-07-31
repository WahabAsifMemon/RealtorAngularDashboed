import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  public users: any = [];
  public checkedUsers: any = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public notificationForm: any = this.fb.group({
    title: [null, Validators.required],
    body: [null, Validators.required],
  });
  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getPrivacy()]);
  }

  async getPrivacy() {
    try {
      const res: any = await this.http
        .get('get-notifications', true)
        .toPromise();
      console.log(res);
      this.users = res?.users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    let user_ids = [];
    const selectedUsers = this.users.filter((user) => user.checked);
    for (const user of selectedUsers) {
      user_ids.push(user?.id);
    }
    this.notificationForm.addControl('user_ids', new FormControl(user_ids));
    this.http
      .post('sendNotification', this.notificationForm.value, true)
      .subscribe((res) => {
        console.log(res);
        this.notificationForm.removeControl('user_ids');
      });
  }
  toggleUserSelection(user: any) {
    user?.checked ? !user?.checked : user?.checked;
  }
  toggleSelectAll(event) {
    const anyUnchecked = this.users?.some((user) => !user.checked);
    this.users?.map((user) => {
      user.checked = anyUnchecked ? true : !user.checked;
    });
  }
  isAllUsersSelected() {
    return this.users?.length > 0 && this.users.every((user) => user.checked);
  }
}
