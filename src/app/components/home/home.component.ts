import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;
  showRemove: number;
  toExclude: any;
  response: any;

  constructor(public generalService: GeneralService) {
    this.toExclude = localStorage.getItem('toExclude') ? localStorage.getItem('toExclude').split(',') : [];
    this.generalService.getPosts({toExclude: this.toExclude}).subscribe((data) => {
      this.response = data;
      this.posts = this.response.filter(p => { return p.story_title })
      .sort(function (a, b) { return a.created_at > b.created_at ? -1 : 1; });
    });
  }

  ngOnInit() {
  }

  itemHovered(i) {
    this.showRemove = i;
  }

  removeItem(objectID, i) {  
    if (this.toExclude.indexOf(objectID) === -1) {
      this.toExclude.push(objectID);
      localStorage.setItem('toExclude', this.toExclude);
    }
    this.posts.splice(i, 1);
  }

}
