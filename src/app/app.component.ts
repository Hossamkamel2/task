import { Component } from '@angular/core';
import { Users } from './models/users.models';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public users: Users[] = [];
  public totalCount: number = 0;
  public pageSize: number = 10;
  public pageNumber: number = 1;
  public search: string = '';
  public gridData: GridDataResult = { data: [], total: 0 };
  public editedUser: Users | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService
      .getUsers(this.pageNumber, this.pageSize, this.search)
      .subscribe((response) => {
        this.users = response.data;
        this.totalCount = response.totalCount;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
      });
  }

  public addHandler(): void {
    this.editedUser = {
      id: 0,
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
    };
  }

  public editHandler(user: Users): void {
    this.editedUser = { ...user };
  }

  public cancelHandler(): void {
    this.editedUser = null;
  }

  public saveHandler(user: Users): void {
    if (user.id === 0) {
      this.usersService.addUser(user).subscribe(() => {
        this.loadUsers();
        this.cancelHandler();
      });
    } else {
      this.usersService.updateUser(user.id, user).subscribe(() => {
        this.loadUsers();
        this.cancelHandler();
      });
    }
  }

  public removeHandler(id: number): void {
    this.usersService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
