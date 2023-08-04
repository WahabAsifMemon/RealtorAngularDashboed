import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-inspire-video',
  templateUrl: './inspire-video.component.html',
  styleUrls: ['./inspire-video.component.scss']
})
export class InspireVideoComponent {
  public Editor:any = ClassicEditor;
  public videos: any = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedVideo: any;
  // public deleteItem: any;

  public modalReference: any;
  public state: boolean = false;
  public videoForm: any = this.fb.group({
    caption: [null, Validators.required],
    thumbnail: [null, Validators.required],
    inspire_video: [null, Validators.required],
    description: [null, Validators.required],
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
    this.videoForm.reset();
    this.videoForm.removeControl('id');
    this.videoForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getvideo()]);
  }

  save(modal: boolean) {
    this.http
      .post('video-create', this.videoForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.videoForm.reset();
        },
        complete: () => {
          this.getvideo();
          this.videoForm.removeControl('id');
          this.videoForm.removeControl('status');
          this.state = false;
        },
      });
  }

  async getvideo() {
    try {
      const res: any = await this.http.get('get-video', true).toPromise();
      console.log(res);
      this.videos = res?.videos;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async deleteVideo(videoId: any) {
    try {
      await this.http.post(`video-delete/${videoId}`, null, true).toPromise();
      this.getvideo();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  }

  async stateItem(item: any) {
    try {
      await this.deleteVideo(item.id);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  }



} 
