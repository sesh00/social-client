// user.component.ts

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
}
