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

  public Editor:any = ClassicEditor;
  public package: any = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedPackage: any;
  // public deleteItem: any;

  public modalReference: any;
  public state: boolean = false;
  public packageForm: any = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    price: [null, Validators.required],
    type: [null, Validators.required],


  });
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.loadData();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
    this.packageForm.reset();
    this.packageForm.removeControl('id');
    this.packageForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getpackage()]);
  }

  save(modal: boolean) {
    this.http
      .post('package-create', this.packageForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.packageForm.reset();
        },
        complete: () => {
          this.getpackage();
          this.packageForm.removeControl('id');
          this.packageForm.removeControl('status');
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

  async deletePackage(packageId: any) {
    try {
      await this.http.post(`package-delete/${packageId}`, null, true).toPromise();
      this.getpackage();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  }

  async stateItem(item: any) {
    try {
      await this.deletePackage(item.id);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  }


}
