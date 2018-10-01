import { Injectable } from  '@angular/core';
import { HttpClient} from  '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	API_URL = 'http://localhost:8080';
  	constructor(private  httpClient:  HttpClient) { }

	getContacts(){
    	return this.httpClient.get(`${this.API_URL}/allcontacts`);
	}
	getContact(id){
    	return this.httpClient.get(`${this.API_URL}/contact/edit/${id}`);
	}

	addContact(contact){
    	return this.httpClient.post(`${this.API_URL}/contact/addContact`, contact);
	}

	updateContact(contact){
		let id = contact.id;
		delete contact['id'];
    	return this.httpClient.put(`${this.API_URL}/contact/update/${id}`, contact);
	}

	deleteContact(id){
    	return this.httpClient.delete(`${this.API_URL}/contact/delete/${id}`, id);
	}

	searchContacts(query){
    	return this.httpClient.post(`${this.API_URL}/searchContacts`, query);
	}
}
