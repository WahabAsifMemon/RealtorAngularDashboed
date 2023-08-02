import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent {
  headerImageUrl = 'https://buybestthemes.com/mobile_app_api/realtor/storage/app/2023-08-02 11:44:00.png';

  public Editor:any = ClassicEditor;
  public package: any = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedFaq: any;
  public modalReference: any;
  public state: boolean = false;
  public faqForm: any = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
  });
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });
  ngOnInit() {
    this.loadData();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, title, description } = this.selectedFaq || {};
      this.faqForm.addControl('id', new FormControl(id));
      this.faqForm.patchValue({
        ...this.faqForm.value,
        title,
        description,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.faqForm.reset();
    this.faqForm.removeControl('id');
    this.faqForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getpackage()]);
  }

  save(modal: boolean) {
    this.http
      .post('faq-create', this.faqForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.faqForm.reset();
        },
        complete: () => {
          this.getpackage();
          this.faqForm.removeControl('id');
          this.faqForm.removeControl('status');
          this.state = false;
        },
      });
  }



  async getpackage() {
    try {
      const res: any = await this.http.get('get-package', true).toPromise();
      console.log(res);
      this.package = res?.package;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  // async userDetail(id) {
  //   this.router.navigateByUrl(`/users/user/${id}`); // Remove the colon from the parameter
  // }
  // async stateItem(event: any, data: any) {
  //   const { id } = event || {};
  //   await this.faqForm.patchValue({
  //     id: id,
  //     status: data.target.checked ? 1 : 0,
  //   });
  //   await this.save(true); // Pass true here to indicate modal is open
  // }

 // In the stateItem function of package.component.ts

 async stateItem(event: any, data: any) {
  this.selectedFaq = this.package?.find((e: any) => e?.id == event.id);
  if (this.selectedFaq) {
    const { id, title, description } = this.selectedFaq || {};
    this.faqForm.patchValue({
      ...this.faqForm.value,
      title,
      description,
    });
    this.faqForm.addControl('id', new FormControl(id));
    this.faqForm.addControl(
      'status',
      new FormControl(data.target.checked ? 1 : 0)
    );
    console.log(this.faqForm.value);
      
  }
  this.save(false);
}

}
