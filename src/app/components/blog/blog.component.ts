import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { HttpResponse } from '../../model/HttpResponse';
import { Blog } from '../../model/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    InputTextareaModule,
    FileUploadModule,
    CardModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
  ],
  providers: [MessageService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  imageToUpload: File | null = null;
  blogForm!: FormGroup;
  blogs: any[] = [];

  ngOnInit(): void {
    this.initializeForm();
  }

  onReadMore(blog: Blog) {
    this.router.navigate(['/blog', blog.id]);
  }

  private initializeForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      intro: ['', [Validators.required, Validators.maxLength(500)]],
      content: ['', [Validators.required, Validators.maxLength(6000)]],
      conclusion: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files.length > 0) {
      this.imageToUpload = event.files[0];
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.submitBlog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Please fill out the form and select an image before submitting.',
        life: 5000,
      });
    }
  }

  private submitBlog() {
    const formData = new FormData();
    formData.append('blog', JSON.stringify(this.blogForm.value));
    if (this.imageToUpload) {
      formData.append('imageFile', this.imageToUpload);
    }
    this.blogService.createBlog(formData).subscribe({
      next: (response: HttpResponse<{ blogId: number }>) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Blog created successfully',
          life: 3000,
        });
        this.blogForm.reset();
        this.router.navigate(['/blog-home']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Failed to create blog',
          life: 5000,
        });
      },
    });
  }
}
