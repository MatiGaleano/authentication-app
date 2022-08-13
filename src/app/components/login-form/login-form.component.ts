import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/services/code-error.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  userLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private codeError: CodeErrorService
    ) {
      this.userLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  get Email() {
    return this.userLogin.get('email');
  }
  get Password() {
    return this.userLogin.get('password');
  }

  onSubmit(): void {
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;
    this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/dashboard']);
      this.toastr.success('Bienvenido', 'Login exitoso');
    }
    ).catch((error) => {
      console.log(error);
      this.toastr.error(this.codeError.response(error.code), 'Error');
    });
  }

}
