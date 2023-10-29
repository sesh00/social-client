// Ваш TypeScript файл

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId: number | undefined;
  user: any;
  friends: any[] | undefined;
  photoUrl: string | undefined;
  newsContent: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.checkUserId();
    });
  }

  checkUserId() {
    const savedUserIdString = localStorage.getItem('userId');
    if (savedUserIdString !== null) {
      const savedUserId = +savedUserIdString;
      if (this.userId == savedUserId) {
        this.loadUserData();
      } else {
        console.error('User ID not found in local storage.');
      }
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  loadUserData() {
    this.userService.getUserDetails(this.userId).subscribe(
      (data) => {
        this.user = data.user;
        this.friends = data.friends;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  goToAdminPage() {
    if (this.user && this.user.role === 'admin') {
      window.location.href = 'http://localhost:3000';
    }
  }

  uploadPhoto() {
    if (this.photoUrl) {
      this.user.photo = this.photoUrl;
      this.photoUrl = '';
      this.userService.updateUserData(this.userId, this.user).subscribe(
        (data) => {
          console.log('User data updated successfully');
        },
        (error) => {
          console.error('Error updating user data', error);
        }
      );
    }
  }

  deletePhoto() {
    this.user.photo = 'https://w.forfun.com/fetch/17/17d767857f1841474ccace158115b032.jpeg';
    // Опционально: отправка изменений на сервер
    this.userService.updateUserData(this.userId, this.user).subscribe(
      (data) => {
        console.log('User data updated successfully');
      },
      (error) => {
        console.error('Error updating user data', error);
      }
    );
  }

  publishNews() {
    if (this.newsContent) {
      this.userService.publishNews(this.userId, this.newsContent).subscribe(
        (data: any) => {
          console.log('Новость успешно опубликована:', data);
          this.newsContent = '';
        },
        (error: any) => {
          console.error('Ошибка при публикации новости', error);
        }
      );
    }
  }
}
