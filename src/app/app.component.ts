import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements onInit {

  title = 'contact-book';
  constructor(private router: Router){

  }
  ngOnInit(){
  	let userData = JSON.parse(localStorage.getItem("ContactAppData"));
  	if(!!userData && !!userData.id)
  		this.router.navigateByUrl('/contacts');
    else
      this.router.navigateByUrl('/');
  }
}
