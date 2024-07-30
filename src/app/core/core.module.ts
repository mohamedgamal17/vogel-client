import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTimeAgoPipe } from './pipes/data-time-ago.pipe';
import { HeaderComponent } from './components/header/header.component';
import UserService from './services/users/user.service';
import PostService from './services/posts/post.service';
import CommentService from './services/comments/comment.service';
import MediaService from './services/medias/media.service';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { AuthMobileHeaderComponent } from './components/auth-mobile-header/auth-mobile-header.component';
import PeopleService from './services/people/people.service';
import { ScrollEndDirective } from './directives/scroll-end.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    DataTimeAgoPipe,
    AuthHeaderComponent,
    MobileHeaderComponent,
    AuthMobileHeaderComponent,
    ScrollEndDirective
  ],
  imports: [
    SharedModule
  ],
  providers :[
    provideHttpClient(withInterceptorsFromDi()),
    UserService, 
    PostService, 
    CommentService, 
    MediaService,
    PeopleService
  ],
  exports:[HeaderComponent, DataTimeAgoPipe , ScrollEndDirective]
})
export class CoreModule { }
