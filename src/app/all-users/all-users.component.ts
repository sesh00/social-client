// all-users.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  currentUser: any;
  userFriends: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching all users', error);
      }
    );

    // Получаем список друзей текущего пользователя
    this.refreshUserFriends();
  }

  isFriend(userId: number): boolean {
    return this.userFriends.includes(userId);
  }

  toggleFriend(userId: number): void {
    if (this.isFriend(userId)) {
      this.userService.removeFriend(userId).subscribe(
        () => {
          // Обработка успешного удаления
          this.userFriends = this.userFriends.filter(friendId => friendId !== userId);
        },
        (error) => {
          console.error('Error removing friend', error);
        }
      );
    } else {
      // Добавить пользователя в друзья
      this.userService.addFriend(userId).subscribe(
        () => {
          // Обработка успешного добавления
          this.userFriends.push(userId);
        },
        (error) => {
          console.error('Error adding friend', error);
        }
      );
    }
  }

  refreshUserFriends(): void {
    this.userService.getUserDetails(this.userService.getCurrentUserId()).subscribe(
      (data) => {
        this.userFriends = data.friends.map((friend: { id: any; }) => friend.id);
      },
      (error) => {
        console.error('Error fetching user friends', error);
      }
    );
  }

  protected readonly JSON = JSON;
}
