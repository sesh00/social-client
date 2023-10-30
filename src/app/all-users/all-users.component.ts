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

    this.refreshUserFriends();
  }

  isFriend(userId: number): boolean {
    return this.userFriends.includes(userId);
  }

  toggleFriend(userId: number): void {
    if (this.isFriend(userId)) {
      this.userService.removeFriend(userId).subscribe(
        () => {
          this.userFriends = this.userFriends.filter(friendId => friendId !== userId);
        },
        (error) => {
          console.error('Error removing friend', error);
        }
      );
    } else {
      this.userService.addFriend(userId).subscribe(
        () => {
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
