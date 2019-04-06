import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContactPage } from '../contact/contact';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  pass:any;

  Email:AbstractControl;
  Pass:AbstractControl;

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private http:Http, public fb: FormBuilder) {
    this.form = fb.group({
      Email: ['',[Validators.required ]],
      Pass: ['',[Validators.required]]

    });
    
    this.Email = this.form.controls['Email'];
    this.Pass = this.form.controls['Pass'];
  }
  add(){
    console.log(this.email+this.pass);
    let body ={
      
      email:this.email,
      pass:this.pass,
      
    
      
    }
    
    this.http.post('http://localhost:8080/login',body).subscribe(res=>{
    
    if(res.json().status==200)
    {
      
      this.navCtrl.push(ContactPage)
    }
    else(alert("Wrong details"))
   
    })
  }
   
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
