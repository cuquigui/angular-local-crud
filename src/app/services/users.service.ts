import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Variáveis
  users: any = []

  constructor(
    private localStorage: LocalStorageService
  ) { 
  }

  getAllUsers(){
    this.users = this.localStorage.getItem(this.localStorage.usersKey, true);
    if (!environment.production){
      console.log(this.users);
    }
  }

  newUser(name: string, cpf: string, birth: string, phone: string, vehicle: any){
    this.users.push({
      name: name,
      cpf: cpf,
      birth: birth,
      phone: phone,
      vehicle: vehicle
    });
    this.localStorage.setItem(this.localStorage.usersKey, this.users, true)
    console.log('new user:', this.users);
  }

  removeUser(index:number){
    this.users.splice(index, 1);
    this.localStorage.removeItem(this.localStorage.usersKey);
    console.log(this.users);
    this.localStorage.setItem(this.localStorage.usersKey, this.users, true);
  }

  updateUser(index:number, name:string, cpf:string, birth: string, phone: string, vehicle: any){
    this.users[index].name = name;
    this.users[index].cpf = cpf;
    this.users[index].phone = phone;
    this.users[index].birth = birth;
    this.users[index].vehicle = vehicle;
    this.localStorage.removeItem(this.localStorage.usersKey);
    this.localStorage.setItem(this.localStorage.usersKey, this.users, true);
  }
}
