import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { UserserviceService } from '../../service/userservice.service';
import { UserRegistration } from '../../model/registration';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ProgressSpinnerModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registrationForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      confirmPassword: [''],
    });

    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');

    if (confirmPasswordControl) {
      confirmPasswordControl.setValidators([
        Validators.required,
        this.matchValues('password'),
      ]);
    }

    if (passwordControl && confirmPasswordControl) {
      passwordControl.valueChanges.subscribe(() => {
        confirmPasswordControl.updateValueAndValidity();
      });
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null
        : { isMatching: true };
    };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      const submissionData: UserRegistration = {
        ...formValues,
      };
      this.submitData(submissionData);
    }
  }

  private submitData(userData: UserRegistration) {
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Unknown error occurred',
          life: 3000,
        });
        this.registrationForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Unknown error occurred',
          life: 5000,
        });
      },
    });
  }
}
