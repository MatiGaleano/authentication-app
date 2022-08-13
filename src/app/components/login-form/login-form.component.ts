import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router
    ) {
      this.userLogin = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;
    this.afAuth.signInWithEmailAndPassword(email, password).then((ress) => {
      console.log(ress);
      this.router.navigate(['/dashboard']);
      this.toastr.success('Bienvenido', 'Login exitoso');
    }
    ).catch((error) => {
      console.log(error);
      this.toastr.error(this.firebaseError(error.code), 'Error');
    });
  }

  firebaseError(error: string): string {
    switch (error) {
      case 'auth/email-already-in-use': return 'El correo ya está en uso';
      case 'auth/invalid-email': return 'El correo no es válido';
      case 'auth/weak-password': return 'La contraseña es demasiado débil';
      default: return 'Error desconocido';
    }
  }

}
