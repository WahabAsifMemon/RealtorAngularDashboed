import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  public Editor:any = ClassicEditor;
  public aboutForm: any = this.fb.group({
    description: [null, Validators.required]
  });
  constructor(private fb:FormBuilder, private http:HttpService){

  }
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getAbout()]);
  }

  async getAbout() {
    try {
      const res: any = await this.http.get('get-about', true).toPromise();
      await this.aboutForm.patchValue({
        description: res?.data?.[0]?.description,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    await this.http
      .post('about-create', this.aboutForm.value, true)
      .subscribe((res: any) => {
        console.log(res);
        this.getAbout();
      });
  }
}
