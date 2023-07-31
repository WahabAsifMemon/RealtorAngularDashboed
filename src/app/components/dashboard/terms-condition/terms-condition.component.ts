import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent {
  public Editor: any = ClassicEditor;
  public termsForm: any = this.fb.group({
    description: [null, Validators.required],
  });
  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    await Promise.all([this.getTerms()]);
  }

  async getTerms() {
    try {
      const res: any = await this.http.get('get-term', true).toPromise();
      await this.termsForm.patchValue({
        description: res?.data?.[0]?.description,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async save() {
    await this.http
      .post('term-create', this.termsForm.value, true)
      .subscribe((res: any) => {
        console.log(res);
        this.getTerms();
      });
  }
}
