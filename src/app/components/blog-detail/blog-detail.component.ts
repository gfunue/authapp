import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../service/blog.service';
import { Blog } from '../../model/blog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  private loadBlog() {
    const id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(id).subscribe({
      next: (response) => {
        this.blog = response.data.blog;
      },
      error: (error) => {
        console.error('Error fetching blog:', error);
      },
    });
  }

  deleteBlog() {
    if (this.blog && this.blog.id) {
      this.blogService.deleteBlog(this.blog.id).subscribe({
        next: () => {
          this.router.navigate(['/blog-home']);
        },
        error: (error) => {
          console.error('Error deleting blog:', error);
        },
      });
    }
  }

  updateBlog() {
    if (this.blog && this.blog.id) {
      this.router.navigate(['/update-blog', this.blog.id]);
    }
  }
}
