import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Http} from '@angular/http';


import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name:any;
  email:any;
  pass:any;

  Name:AbstractControl;
  Email:AbstractControl;
  password:AbstractControl;

  form:FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,   private http:Http, public fb:FormBuilder) {

    this.form = this.fb.group({
      Name: ['',[Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z]*') ]],
      Email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])], 
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*') ])]
    });
    this.Name = this.form.controls['Name'];
    this.Email = this.form.controls['Email'];
    this.password = this.form.controls['password'];
    
  
  }

  add(){
    console.log(this.name+this.email+this.pass);
    var body ={
      name:this.name,
      email:this.email,
      pass:this.pass,
      
      
    }
  
    this.http.post('http://localhost:8082/insert',body).subscribe(res=>{
      if(res.json().status==200)
      {
        this.navCtrl.push(LoginPage);
        
      }
    })
  }

  

}
