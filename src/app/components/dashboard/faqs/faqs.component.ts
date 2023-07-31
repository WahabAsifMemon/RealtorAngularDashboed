import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {
  public Editor:any = ClassicEditor;
  public faqs: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public modalReference: any;
  public state: boolean = false;
  public faqForm: any = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    position: [null],
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
    this.state = state == 'edit' ? true : false;
    // if (state == 'edit') {
    //   const { id, heading, paragraph, position } = this.selectedFaq || {};
    //   this.faqForm.addControl('id', new FormControl(id));
    //   this.faqForm.patchValue({
    //     ...this.faqForm.value,
    //     heading,
    //     paragraph,
    //     position,
    //   });
    // }
  }
  proceed() {
    this.modalReference.close();
    this.faqForm.reset();
    this.faqForm.removeControl('id');
    this.faqForm.removeControl('active_status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getFaqs()]);
  }

  async getFaqs() {
    try {
      const res: any = await this.http.get('get-faq', true).toPromise();
      console.log(res);
      this.faqs = res?.faqs;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async userDetail(id) {
    this.router.navigateByUrl(`/users/user/${id}`); // Remove the colon from the parameter
  }
  async stateItem(event: any, data: any) {
    const { id } = event || {};
    // await this.faqForm.patchValue({
    //   id: id,
    //   status: data.target.checked ? 1 : 0,
    // });
    await this.save()
  }
  async save(){
    // await this.http.post('user-update',this.faqForm.value,true).subscribe((res:any)=>{
    //   console.log(res);
    //   this.getFaqs();
    // })
  }
}
