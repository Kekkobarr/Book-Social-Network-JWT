import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models/registration-request';
import { AuthenticationService } from 'src/app/services/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email:'', firstname:'', lastname:'', password: ''}
  errorMsg: Array<string> = [];

  constructor(private router: Router, private authService: AuthenticationService){

  }

  register():void{
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next:() => {
        this.router.navigate(['activate-account'])
      },
      error:(err) => {
        this.errorMsg = err.error.validationErrors;
      }
    })
  }

  login():void{
    this.router.navigate(['login']);
  }

}
