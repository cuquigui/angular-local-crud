import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-costumer',
  templateUrl: './new-costumer.component.html',
  styleUrls: ['./new-costumer.component.css']
})
export class NewCostumerComponent implements OnInit {
  // Variables
  manufacters: any = [];
  models: any = [];
  vehicleType: string = 'carros';
  manufacterSelected: number = 1;
  modelSelected: number = 1;
  inputName: string = '';
  inputCPF: string = '';
  inputPhone: string = '';
  inputBirthDate: string = '';
  hasIndex: boolean = false;
  editingMode: boolean = false;
  index!: number;

  constructor(
    private api: ApiService,
    private users: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params:any)=>{
        if (params.index){
          this.hasIndex = true;
          this.index = params.index;
          this.users.getAllUsers();

          if (!environment.production){
            console.log(this.users.users[params.index]);
          }
          
          this.inputName = this.users.users[params.index].name;
          this.inputCPF = this.users.users[params.index].cpf;
          this.inputPhone = this.users.users[params.index].phone;
          this.inputBirthDate = this.users.users[params.index].birth;         
          this.vehicleType = this.users.users[params.index].vehicle.type;
          this.manufacterSelected = this.users.users[params.index].vehicle.manufacter;
          // Necessário pegar os modelos existentes após carregar a marca pelo array;
          this.getModels();
          // Depois de carregado, seleciona o modelo.
          this.modelSelected = this.users.users[params.index].vehicle.model;
        }
      })
    this.getManufacter();
  }

  getManufacter(){
    this.api.vehicleData(`/${this.vehicleType}/marcas`)
      .then((res:any)=>{
        if (!environment.production){
          console.log(res);
        }

        this.manufacters = res;
      });
  }

  getModels(){
    this.api.vehicleData(`/${this.vehicleType}/marcas/${this.manufacterSelected}/modelos`)
      .then((res:any)=>{
        if (!environment.production){
          console.log(res);
        }

        this.models = res.modelos;
      })
  }


  insertNewCostumer(){
    if (!this.inputName || this.inputName == ''){
      Swal.fire('Oops', 'Você <b>não informou o nome</b> do cliente!', 'error');
    } else if (!this.inputCPF || this.inputCPF == ''){
      Swal.fire('Oops', 'Você <b>não informou o CPF</b> do cliente!', 'error');
    } else if (!this.inputBirthDate || this.inputBirthDate == ''){
      Swal.fire('Oops', 'Você <b>não informou a data de nascimento</b> do cliente!', 'error');
    } else if (!this.inputPhone || this.inputPhone == ''){
      Swal.fire('Oops', 'Você <b>não informou o telefone</b> do cliente!', 'error');
    } else if (!this.modelSelected || this.modelSelected == undefined ){
      Swal.fire('Oops', 'Você <b>não informou o veículo</b> do cliente!', 'error');
    } else {
      this.users.newUser(this.inputName, this.inputCPF, this.inputBirthDate, this.inputPhone,{ type: this.vehicleType, manufacter: this.manufacterSelected, model: this.modelSelected });
      setTimeout(() => {
        Swal.fire({ position: 'top-right', title: 'Sucesso', html: `${this.inputName} <b>cadastrado com sucesso!</b>`, icon: 'success', showConfirmButton: false, timer: 1500  });
        this.inputName = '';
        this.inputCPF = '';
        this.inputPhone = '';
        this.modelSelected = 1;
        this.manufacterSelected = 1;
        this.vehicleType = 'carros';
        this.inputBirthDate = '';
      }, 100);
    }
  }

  updateCostumer(){
    if (!this.inputName || this.inputName == ''){
      Swal.fire('Oops', 'Você <b>não informou o nome</b> do cliente!', 'error');
    } else if (!this.inputCPF || this.inputCPF == ''){
      Swal.fire('Oops', 'Você <b>não informou o CPF</b> do cliente!', 'error');
    } else if (!this.inputBirthDate || this.inputBirthDate == ''){
      Swal.fire('Oops', 'Você <b>não informou a data de nascimento</b> do cliente!', 'error');
    } else if (!this.inputPhone || this.inputPhone == ''){
      Swal.fire('Oops', 'Você <b>não informou o telefone</b> do cliente!', 'error');
    } else if (!this.modelSelected || this.modelSelected == undefined ){
      Swal.fire('Oops', 'Você <b>não informou o veículo</b> do cliente!', 'error');
    } else {
      this.users.updateUser(this.index, this.inputName, this.inputCPF, this.inputBirthDate, this.inputPhone,{ type: this.vehicleType, manufacter: this.manufacterSelected, model: this.modelSelected });
      setTimeout(() => {
        Swal.fire({ position: 'top-right', title: 'Sucesso', html: `${this.inputName} <b>editado com sucesso!</b>`, icon: 'success', showConfirmButton: false, timer: 1500  });
        this.editingMode = false;
      }, 100);
    }
  }

}
