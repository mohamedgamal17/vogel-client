import { Component, Input } from '@angular/core';
import { Post } from '../../../../core/types/posts/post.interface';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post : Post
}
