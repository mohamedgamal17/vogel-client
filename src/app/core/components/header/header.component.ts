import { AfterViewInit, Component } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent implements AfterViewInit {
  constructor() {
  }
  ngAfterViewInit(): void {
    $(".msg-trigger-btn").on("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      var $this = $(this);
      var $prevTartget = $(this).parent().siblings().children(".msg-trigger-btn").attr('href');
      var target = $this.attr('href');
  
      if(target){
        $(target).slideToggle();
      }
      
      if($prevTartget){
        $($prevTartget).slideUp();
      }
    });
  }



}
