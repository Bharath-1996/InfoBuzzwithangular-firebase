import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { firestore } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from 'src/app/shared/image.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
list :Employee[];
 invoiceCol: AngularFirestoreCollection<Employee>;
invoiceObservableArray: Observable<Employee[]>;
invoiceArray: Employee[];
imgsrc:string;
selectedimage:any=null;
issubmitted: boolean;
finalimaageurl:string;
formcomplete:boolean;
formTemplate=new FormGroup({
  imageUrl:new FormControl('',Validators.required)
})
  constructor(private service:EmployeeService,private firestore:AngularFirestore,private afAuth:AngularFireAuth,private imgservice:ImageService,public storage:AngularFireStorage) { }

  ngOnInit() {
this.resetForm()
this.getemployeebyid().then(data => {
  console.log(data);
  let emp:Employee=data;
  this.service.formData=Object.assign({},emp);
  
});
  
this.uploadformreset();
    this.imgservice.getImageDetailList();
    if(this.service.formData.imageUrl!=null)
    {
       this.formcomplete=true;
    }
    else
    {
      this.formcomplete=false;
    }
}
  onSubmit(form:NgForm)
  {
    console.log('in the form')
    console.log(this.finalimaageurl);
    console.log(this.afAuth.auth.currentUser.uid)
    let data=Object.assign({},form.value);
    delete data.id;
    // if(form.value.id==null)
    //   this.firestore.collection('employees').add(data);
    // else
    form.value.id=this.afAuth.auth.currentUser.uid;
    data.imageUrl=this.finalimaageurl;
    this.service.formData.imageUrl=this.finalimaageurl;
    this.firestore.doc('employees/'+form.value.id).update(data);
    
    //this.toastr.success('Submitted successfully','Emp Reg');
  }
  Editform()
{
  this.formcomplete=true;
  this.uploadformreset();
}
  resetForm(form?:NgForm)
  {
    if(form!=null)
    form.resetForm();  
      
    this.service.formData={
      id:null,
      fullName:'',
      position:'',
      empCode:'',
      mobile:'',
      email:'',
      imageUrl:'',
    }

  }
 getemployeebyid()
 {
   return this.firestore.collection('employees').doc(this.afAuth.auth.currentUser.uid).ref.get()
   .then(function(doc) {
     return doc.data() as Employee;   
   });;
 }


  onEdit(emp:Employee)
  {
    this.service.formData=Object.assign({},emp); 
  }
  showpreview(event:any)
{
  if(event.target.files && event.target.files[0])
  {
    const reader=new FileReader();
    reader.onload=(e:any) => this.imgsrc=e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedimage=event.target.files[0];
  }
  else{
    this.imgsrc='/assets/img/clickheretoupload.jpeg';
    this.selectedimage=null;
  }
}
uploadpic(formValue)
{
  this.issubmitted=true;
  if(this.formTemplate.valid)
  {
    var filePath='images/'+this.afAuth.auth.currentUser.uid;
    const fileRef=this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedimage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['imageUrl']=url;
          formValue['uid']=this.afAuth.auth.currentUser.uid;
          this.finalimaageurl=url;
          this.service.formData.imageUrl=url;
          //this.firestore.collection('imagedetails').add(formValue);
          this.uploadformreset();
        })
      })
    ).subscribe();
    console.log(filePath);
  }
}
get formControls()
{
  return this.formTemplate['controls'];
}
uploadformreset()
{
  this.formTemplate.reset();
  this.formTemplate.setValue({
    imageUrl:''
  });
  if(this.service.formData.imageUrl==null)
  {
    this.imgsrc='/assets/img/clickheretoupload.jpeg';
  }
  else
  {
    this.imgsrc=this.service.formData.imageUrl.toString();
  }
  this.selectedimage=null;
  this.issubmitted=false;
}
}
