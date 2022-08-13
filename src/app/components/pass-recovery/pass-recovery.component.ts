import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodeErrorService } from 'src/app/services/code-error.service';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.scss']
})
export class PassRecoveryComponent implements OnInit {
  userRecovery: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private codeError: CodeErrorService
    ) {
    this.userRecovery = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.userRecovery.get('email');
  }

  onSubmit(): void {
    const email = this.userRecovery.value.email;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('Se ha enviado un link de recuperacion a su Email', 'Envío exitoso');
      this.router.navigate(['/login']);
    } ).catch((error) => {
      console.error(error);
      this.toastr.error(this.codeError.response(error.code), 'Error');
    }
    );
  }

}
