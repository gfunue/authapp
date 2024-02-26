import { Component, OnInit} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Blog } from '../../model/blog';
import { BlogService } from '../../service/blog.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { HttpResponse } from '../../model/HttpResponse';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
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
    PaginatorModule,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  blogs: any[] = [];
  currentPage = 0;
  pageSize = 6;
  totalBlogs = 0;
  sort = 'title,asc';

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService
      .getAllBlogs(this.currentPage, this.pageSize, this.sort)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.blogs = response.data.blogs.content;
          this.totalBlogs = response.data.blogs.totalElements;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message || 'Blogs loaded successfully',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'Error loading blogs',
          });
        },
      });
  }

  onReadMore(blog: Blog) {
    this.router.navigate(['/blog', blog.id]);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.loadBlogs();
  }
}
