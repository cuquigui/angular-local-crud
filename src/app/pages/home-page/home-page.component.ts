import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // Variables
  customerCount: number = 0;

  constructor(
    private users: UsersService
  ) { }

  ngOnInit(): void {
    console.log('aqui foi');
    this.users.getAllUsers();
    this.customerCount = this.users.users.length;    
  }

}
