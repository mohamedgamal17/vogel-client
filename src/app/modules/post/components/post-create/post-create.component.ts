import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { PostRequest } from '../../../../core/services/posts/requests/post.request';
import PostService from '../../../../core/services/posts/post.service';
import MediaService from '../../../../core/services/medias/media.service';
import { BehaviorSubject, firstValueFrom, from, lastValueFrom } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Post } from '../../../../core/types/posts/post.interface';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  formGroup: FormGroup
  @Output() postCreated: EventEmitter<Post> = new EventEmitter<Post>();

  isPosting = new BehaviorSubject<boolean>(false)
  isPosting$ = this.isPosting.asObservable()
  constructor(private fb: FormBuilder, private postService: PostService, private mediaService: MediaService) {

  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      caption: ['', Validators.required],
      file: [null, [Validators.required]]
    })
  }

  updateFile(event: any) {
    const file: File = event.target.files[0];

    if (event.target.files.length > 0) {

      this.mediaService.create(file)
        .subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            var progress = Math.round((100 * event.loaded) / event.total!);
          } else if (event.type == HttpEventType.Response) {
            this.formGroup.patchValue({
              file: event.body?.data.id
            })
          }
        })

    }
  }

  async createPost() {
    if (this.formGroup.valid) {
      var value = this.formGroup.value

      var mediaId: string | undefined

      var request: PostRequest = {
        caption: value.caption,
        mediaId: value.file
      }

      this.isPosting.next(true);

      this.postService.create(request)
        .subscribe((resp) => {
          this.isPosting.next(false)
          this.postCreated.emit(resp.data)
        })
    }
  }


}
