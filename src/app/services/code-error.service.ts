import { Injectable } from '@angular/core';
import { FirebaseCodeError } from '../utils/code-error';

@Injectable({
  providedIn: 'root'
})
export class CodeErrorService {

  constructor()  {}

  response(error: string) {
    switch (error) {
      // El correo ya existe
      case FirebaseCodeError.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // Contraseña debil
      case FirebaseCodeError.WeakPassword:
        return 'La contraseña es muy debil';

      // Correo invalido
      case FirebaseCodeError.InvalidEmail:
        return 'Correo invalido';

      // Contraseña incorrecta
      case FirebaseCodeError.WrongPassword:
        return 'Contraseña incorrecta';

      // El usuario no existe
      case FirebaseCodeError.UserNotFound:
        return 'El usuario no existe'; 
      default:
        return 'Error desconocido';
    }
  }
}