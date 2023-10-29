import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(): void {
    this.userService.getUserNews().subscribe(
      (data: any) => {
        this.news = data.news;
      },
      (error: any) => {
        console.error('Error fetching news', error);
      }
    );
  }


}
