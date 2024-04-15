import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Validator } from '../../utils/helpers'
import { UsuarioService } from 'src/app/services';
import { RespuestaLogin } from 'src/app/models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  constructor( private router: Router, private usuarioService: UsuarioService ) {

  }

  public visible: boolean = false
	public errorMessage: string = ''

	//Se crea la valiable 'validatorTemplate' para poder usar las validaciones en el template
	public validatorTemplate = Validator

	public loginForm = new FormGroup({
		username: new FormControl(
			'',
			[Validator.required]
		),
		password: new FormControl(
			'',
			[Validator.required]
		)
	})

	get loginUsername(){
		return this.loginForm.get('username')?.value
	}

	get loginPassword(){
		return this.loginForm.get('password')?.value
	}

	loginSubmit() {
		if (!this.loginForm.invalid) {
			const data = {
				usuario: this.loginUsername,
				password: this.loginPassword
			}

			this.usuarioService.postLoginUser(data).subscribe((result: RespuestaLogin)=>{
				if (result.usuario !== null) {
					console.log(result.usuario)
					this.router.navigate(['dashboard'])
				} else {
					this.errorMessage = result.mensaje
				}
			})
		} else { 
			this.errorMessage = 'Ingrese los datos de forma correcta'
		}
	}

  ngOnInit(): void {
    
  }
}
