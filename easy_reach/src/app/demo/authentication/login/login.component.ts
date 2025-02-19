// angular import
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  private router = inject(Router);

  userObj:any={
userName:'',
passWord:''
  }

  onLogin() {
    debugger
    if (this.userObj.userName === 'Admin' && this.userObj.passWord === 'Admin') {
      localStorage.setItem('loginuser', this.userObj.userName);
      this.router.navigate(['/temperature-dashboard']);
    } else {
      alert("Check Username and Password");
    }
  }


  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
}
