import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public settingsForm: any = this.fb.group({
    ios_url: [null, Validators.required],
    play_url: [null, Validators.required],
  });
  public passwordForm: any = this.fb.group({
    old_password: [null, Validators.required],
    new_password: [null, Validators.required],
    confirm_password: [null, Validators.required],
  });
  showPassword = {};

  constructor(private fb: FormBuilder, private http: HttpService, private router:Router) {}
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getSettings()]);
  }

  async getSettings() {
    try {
      const res: any = await this.http.get('setting-get', true).toPromise();
      await this.settingsForm.patchValue({
        ios_url: res?.Setting?.ios_url,
        play_url: res?.Setting?.play_url,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    await this.http
      .post('setting-create', this.settingsForm.value, true)
      .subscribe((res: any) => {
        console.log(res);
        this.getSettings();
      });
  }
  async changePassword() {
    await this.http
      .post('admin/change-password', this.passwordForm.value, true)
      .subscribe((res: any) => {
        this.passwordForm.reset();
        this.logoutUser()
      });
  }

  togglePassword(field) {
    this.showPassword[field] = !this.showPassword[field];

    const passwordField = document.getElementById(field);
    if (this.showPassword[field]) {
      passwordField.setAttribute('type', 'text');
    } else {
      passwordField.setAttribute('type', 'password');
    }
  }
  async logoutUser() {
    await this.http.post('admin/logout', {}, true).subscribe((res: any) => {
      console.log(res);
      localStorage.clear();
      this.router.navigateByUrl('auth/login');
    });
  }
}
