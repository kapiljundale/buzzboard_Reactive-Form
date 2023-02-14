import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  registerForm!: FormGroup
  tabularRecord: any[] = [];
  edit: boolean = false;
  actionBTN: string = 'Register'
  constructor(private formBuilder: FormBuilder, private dbService: DbService) {

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });



    this.showTable()
  }

  onRegister(registerForm: any) {
    if (!this.edit) {
      this.dbService.addUSer(registerForm).subscribe(res => console.log(res));
      console.log("registerForm===>", registerForm
      );
    }

  }

  showTable() {
    this.dbService.getAllRecord().subscribe({
      next: (res: any) => {
        this.tabularRecord = res;
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
  onDelete(id: number) {
    debugger
    this.dbService.deleteRecord(id).subscribe(res => console.log(res));
    this.showTable()
  }
  onEdit(id: number, data: any) {
    debugger
    this.actionBTN = "Update"
      this.registerForm.controls['firstName'].setValue(data.firstName),
        this.registerForm.controls['lastName'].setValue(data.lastName),
        this.registerForm.controls['email'].setValue(data.email),
        this.registerForm.controls['phone'].setValue(data.phone),
        this.registerForm.controls['company'].setValue(data.company),
        this.registerForm.controls['gender'].setValue(data.gender),
        this.registerForm.controls['dob'].setValue(data.dob),
        this.registerForm.controls['password'].setValue(data.password),
        this.registerForm.controls['confirm_password'].setValue(data.confirm_password)
        this.dbService.editRecord(id,data).subscribe(res => {
          console.log(res);
          debugger
          
        });
        debugger
  }

}
