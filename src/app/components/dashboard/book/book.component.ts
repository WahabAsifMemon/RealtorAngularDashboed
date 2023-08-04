import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  public Editor:any = ClassicEditor;
  public books: [] = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedBook: any;
  public modalReference: any;
  public state: boolean = false;
  public bookForm: any = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    type: [null, Validators.required],
    book_img: [null, Validators.required],
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
      const { id, title, description , type , book_img} = this.selectedBook || {};
      this.bookForm.addControl('id', new FormControl(id));
      this.bookForm.patchValue({
        ...this.bookForm.value,
        title,
        description,
        type,
        book_img,

      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.bookForm.reset();
    this.bookForm.removeControl('id');
    this.bookForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getBooks()]);
  }

  save(modal: boolean) {
    if (!this.state) {
      this.bookForm.patchValue({
        ...this.bookForm.value,
        position: this.books?.length + 1,
      });
    }
    this.http
      .post('book-create', this.bookForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.bookForm.reset();
        },
        complete: () => {
          this.getBooks();
          this.bookForm.removeControl('id');
          this.bookForm.removeControl('status');
          this.state = false;
        },
      });
  }

  async getBooks() {
      try {
        const res: any = await this.http.get('get_book', true).toPromise();
        console.log(res);
        
        this.books = res?.books;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

 async stateItem(event: any, data: any) {
  this.selectedBook = this.books?.find((e: any) => e?.id == event.id);
  if (this.selectedBook) {
    const { id, title, description , type , book_img } = this.selectedBook || {};
    this.bookForm.patchValue({
      ...this.bookForm.value,
      title,
      description,
      type,
      book_img,
    });
    this.bookForm.addControl('id', new FormControl(id));
    this.bookForm.addControl(
      'status',
      new FormControl(data.target.checked ? 1 : 0)
    );
    console.log(this.bookForm.value);
      
  }
  this.save(false);
}


} 