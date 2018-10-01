import { Component, OnInit, ViewChild  } from '@angular/core';
import { ApiService } from  '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

	@ViewChild(ToastComponent ) toast: ToastComponent ;
  	private contacts:  Array<object> = [];
  	fName: string = '';
  	lName: string = '';
  	mobile: string = '';
  	empId: string = '';
  	contact = {};
	constructor(
		private apiService:  ApiService, 
		private spinner: NgxSpinnerService, 
		private router: Router) { }

	ngOnInit() {
		this.spinner.show();
	    this.getContacts();
	}
	public getContacts(){
	    this.apiService.getContacts().subscribe((data:  Array<object>) => {
	        this.contacts  =  data.contacts;
	        this.spinner.hide();
	    });
	}
	public confirmDelete(c){
		this.contact = c;
	}
	public deleteContact(){
		this.spinner.show();
		this.apiService.deleteContact(this.contact._id).subscribe((data) => {
			let index = this.contacts.indexOf(this.contact);
			this.toast.myFunction();
			this.toast.message = "Contact Deleted Successfully!";
			this.contacts.splice(index, 1);
	        this.spinner.hide();
	    });
	}

	public searchContact(){
		this.spinner.show();
		let sendData = {};
		if( !!this.fName) sendData['fName'] = this.fName;
		if( !!this.lName) sendData['lName'] = this.lName;
		if( !!this.mobile) sendData['mobile'] = this.mobile;
		if( !!this.empId) sendData['empId'] = this.empId;

		this.apiService.searchContacts(sendData).subscribe((data:  Array<object>) => {
	        this.contacts  =  data.contacts;
	        this.spinner.hide();
	    });
	}
}
