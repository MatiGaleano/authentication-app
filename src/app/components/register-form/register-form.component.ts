import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/services/code-error.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  userRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private codeError: CodeErrorService
  ) {
    this.userRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passRepeat: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get Email() {
    return this.userRegister.get('email');
  }
  get Password() {
    return this.userRegister.get('password');
  }
  get PassRepeat() {
    return this.userRegister.get('passRepeat');
  }

  onSubmit(): void {
    const email = this.userRegister.value.email;
    const password = this.userRegister.value.password;
    if (password !== this.userRegister.value.passRepeat) {
      this.toastr.error('Las contraseñas no coinciden');
      return;
    }
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
        this.toastr.success('Registro exitoso', 'Bienvenido');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(this.codeError.response(error.code), 'Error');
      });
  }
}
