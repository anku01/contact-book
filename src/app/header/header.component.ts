import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  userData = "";
  firstName = ""
  ngOnInit() {
  	if(localStorage.getItem('ContactAppData'))
  	this.userData = JSON.parse( localStorage.getItem('ContactAppData') );
 	this.firstName = this.userData.name.split(' ')[0];
  }

  signOut(){
  	localStorage.removeItem('ContactAppData');
  	this.userData ="";
  	this.firstName = "";
  	this.router.navigateByUrl('/');
  }

}
