import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from  '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastComponent } from '../../toast/toast.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;

  @ViewChild(ToastComponent ) toast: ToastComponent ;
  constructor(private  apiService:  ApiService, 
  	private router: Router, 
  	private spinner: NgxSpinnerService,
  	private aRoute: ActivatedRoute,
  	private formBuilder: FormBuilder
  	) { }
  contactData = {
  	fName: '',
  	lName: '',
  	mobile: '',
  	empId: ''
  };
  const userId = '';
  ngOnInit() {

  	this.registerForm = this.formBuilder.group({
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.max(9999999999), Validators.min(11111111)]],
        empId: ['', [Validators.required]]
    });
  	this.aRoute.params.subscribe( params => {
  		if(!!params && !!params.id){
  			this.spinner.show();
		  	this.apiService.getContact(params.id).subscribe((response) => {
		  		this.userId = params.id;
			    if(!!response && !!response._id){
			    	this.spinner.hide();
					this.registerForm = this.formBuilder.group({
				        fName: [response.fName, Validators.required],
				        lName: [response.lName, Validators.required],
				        mobile: [
				        	response.mobile,
					         [
					         	Validators.required, Validators.max(9999999999), 
					         	Validators.min(11111111)
					         ]
				        ],
				        empId: [response.empId, [Validators.required]]
				    });

			    }else{
			    	this.spinner.hide();
			    }

			});
  		}
  	})
  }

  get f() { return this.registerForm.controls; }


  saveContact(){
  	this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } else{
    	this.contactData = this.registerForm.value;
    }
  	this.spinner.show();
  	if(!!this.userId){
  		this.contactData.id = this.userId;
	  	this.apiService.updateContact(this.contactData).subscribe((response) => {
		    if(response){
		    		this.toast.myFunction();
		    		this.toast.message = "Contact Updated Successfully!";
			    	this.spinner.hide();
			    	setTimeout(() => {
					  this.router.navigateByUrl('/contacts');
					}, 1000);
			    }else{
			    	this.spinner.hide();
			    }

			});
		}
		else{
			this.apiService.addContact(this.contactData).subscribe((response) => {
			    if(response && response.message){
			    	this.spinner.hide();
			    	this.toast.myFunction();
			    	this.toast.message = "Contact Added Successfully!";
			    	setTimeout(() => {
					  this.router.navigateByUrl('/contacts');
					}, 1000);
			    	// this.router.navigateByUrl('/contacts');
			    }else{
			    	this.spinner.hide();
			    }
			});			
	  	}
	}

}
