import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { BlogService } from '../../service/blog.service';
import { Router } from '@angular/router';
import { HttpResponse } from '../../model/HttpResponse';
import { Blog } from '../../model/blog';

@Component({
  selector: 'app-blog-home',
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
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css',
})
export class BlogHomeComponent implements OnInit {
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
  searchQuery = '';

  ngOnInit(): void {
    this.loadBlogs();

    this.blogService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.loadBlogs();
    });
  }

  loadBlogs() {
    this.blogService
      .getAllBlogs(this.currentPage, this.pageSize, this.sort)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.blogs = response.data.blogs.content.filter((blog: { title: string; }) =>
            blog.title.toLowerCase().includes(this.searchQuery)
          );
          this.totalBlogs = this.blogs.length;
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

