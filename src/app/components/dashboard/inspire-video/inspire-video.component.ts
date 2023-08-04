import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { HelperService } from 'src/app/shared/services/helper.service'; // Import the HelperService


@Component({
  selector: 'app-inspire-video',
  templateUrl: './inspire-video.component.html',
  styleUrls: ['./inspire-video.component.scss']
})
export class InspireVideoComponent {
  public Editor:any = ClassicEditor;
  // public videos: [] = [];
  public videos: any = [];
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedVideo: any;
  public modalReference: any;
  public currentThumbnail: any;
  public currentInspireVideo: any;
  public state: boolean = false;
  public videoForm: any = this.fb.group({
    caption: [null, Validators.required],
    thumbnail: [null, Validators.required],
    description: [null, Validators.required],
    inspire_video: [null, Validators.required],
  });
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
     private helper: HelperService 
  ) {}
  userForm: any = this.fb.group({
    id: [null, Validators.required],
    status: [null, Validators.required],
  });
  ngOnInit() {
    this.loadData();
  }

  onThumbnailSelected(event: any) {
    this.helper
    .fileUploadHttp(event)
    .then((result: any) => {
      this.videoForm.patchValue({
        thumbnail: result.data.image_url,
      });
      this.videoForm.patchValue({
        ...this.videoForm.value,
        thumbnail: result.data.image_url,
      });
      console.log(this.videoForm.value)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  
onInspireVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.helper
        .videoUploadHttp(file) 
        .then((videoPath: string) => {
          this.videoForm.patchValue({
            inspire_video: videoPath,
          });
          const reader = new FileReader();
          reader.onload = () => {
            this.currentInspireVideo = reader.result;
          };
          reader.readAsDataURL(file);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, caption, description, thumbnail, inspire_video } = this.selectedVideo || {};
      this.videoForm.addControl('id', new FormControl(id));
      this.videoForm.patchValue({
        ...this.videoForm.value,
        caption,
        thumbnail,
        inspire_video,
        description,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.videoForm.reset();
    this.videoForm.removeControl('id');
    this.videoForm.removeControl('status');
    this.state = false;
  }
  async loadData() {
    await Promise.all([this.getVideos()]);
  }

  save(modal: boolean) {
    if (!this.state) {
      this.videoForm.patchValue({
        ...this.videoForm.value,
        position: this.videos?.length + 1,
      });
    }
    this.http
      .post('inspire', this.videoForm.value, true)

      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.videoForm.reset();
        },
        complete: () => {
          this.getVideos();
          this.videoForm.removeControl('id');
          this.videoForm.removeControl('status');
          this.state = false;
        },
      });
  }



  async getVideos() {
    try {
      const res: any = await this.http.get('get-video', true).toPromise();
      console.log(res);
      this.videos = res?.videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

 async stateItem(event: any, data: any) {
  this.selectedVideo = this.videos?.find((e: any) => e?.id == event.id);
  if (this.selectedVideo) {
    const { id, caption, thumbnail, inspire_video, description } = this.selectedVideo || {};
    this.videoForm.patchValue({
      ...this.videoForm.value,
      caption,
      thumbnail,
      inspire_video,
      description,
    });
    this.videoForm.addControl('id', new FormControl(id));
    this.videoForm.addControl(
      'status',
      new FormControl(data.target.checked ? 1 : 0)
    );
    console.log(this.videoForm.value);
      
  }
  this.save(false);
}
} 
