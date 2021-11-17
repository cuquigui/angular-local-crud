import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-costumers',
  templateUrl: './list-costumers.component.html',
  styleUrls: ['./list-costumers.component.css']
})
export class ListCostumersComponent implements OnInit {
  // Variables
  costumersList: any = [];

  constructor(
    private users: UsersService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.users.getAllUsers();
    this.costumersList = this.users.users;
  }

  editUser(index:number){
    this.route.navigate([`/new-costumer/${index}`]);
  }

  removeUser(index:number){
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá desfazer isto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remova-o!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.removeUser(index);
        Swal.fire({ position: 'top-right', title: 'Sucesso', html: `Cliente <b>removido com sucesso!</b>`, icon: 'success', showConfirmButton: false, timer: 1500  });
      }
    })
    
  }

}
