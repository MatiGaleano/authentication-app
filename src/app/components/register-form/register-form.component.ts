import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router
    ) {
    this.userRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
          )]],
      passRepeat: ['',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
          )]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.userRegister.value.email;
    const password = this.userRegister.value.password;
    if (password !== this.userRegister.value.passRepeat) {
      this.toastr.error('Las contraseñas no coinciden');
      return;
    }
    this.afAuth.createUserWithEmailAndPassword(email, password).then((ress) => {
      console.log(ress);
      this.router.navigate(['/login']);
      this.toastr.success('Verifica tu correo para continuar', 'Registro exitoso');
    }).catch((error) => {
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
