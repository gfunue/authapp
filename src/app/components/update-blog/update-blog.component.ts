import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BlogService } from '../../service/blog.service';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    FileUploadModule,
    InputTextModule,
  ],
  providers: [MessageService],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css',
})
export class UpdateBlogComponent implements OnInit {
  blogForm!: FormGroup;
  imageToUpload: File | null = null;
  blogId!: number;
  imageUrl?: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.params['id']);
    this.initializeForm();
    this.loadBlog();
  }

  private initializeForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      intro: ['', [Validators.required, Validators.maxLength(1000)]],
      content: ['', [Validators.required, Validators.maxLength(10000)]],
      conclusion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  private loadBlog() {
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe({
        next: (response) => {
          const blog = response.data.blog;
          this.blogForm.patchValue({
            title: blog.title,
            intro: blog.intro,
            content: blog.content,
            conclusion: blog.conclusion,
          });
          this.imageUrl = blog.imageUrl;
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Blog loaded successfully',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'Failed to load blog',
          });
        },
      });
    }
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files.length > 0) {
      this.imageToUpload = event.files[0];
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('blog', JSON.stringify(this.blogForm.value));
      if (this.imageToUpload) {
        formData.append('imageFile', this.imageToUpload);
      }
      this.blogService.updateBlog(this.blogId, formData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Blog updated successfully',
          });
          this.router.navigate(['/blog', this.blogId]);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'Failed to update blog',
          });
          console.error('Error updating blog:', error);
        },
      });
    }
  }
}
