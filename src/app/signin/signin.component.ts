import {Component, OnInit} from '@angular/core';
import {
    AuthService,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
 
 
export class SigninComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private router: Router ) {}

  ngOnInit(){
  	let userData = JSON.parse(localStorage.getItem("ContactAppData"));
  	if(!!userData && !!userData.id)
  		this.router.navigateByUrl('/contacts');
    else
      this.router.navigateByUrl('/');
  }

  public socialSignIn() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {      	
        localStorage.setItem("ContactAppData", JSON.stringify(
        	{
        		id: userData.id, 
        		name: userData.name, 
        		email: userData.email, 
        		image: userData.image
        	}
        ));
        this.router.navigateByUrl('/contacts');
      }
    );
  }
  
}