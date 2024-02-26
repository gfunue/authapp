import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blog } from '../model/blog';
import { environment } from '../environment/environment';
import { HttpResponse } from '../model/HttpResponse';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogBaseUrl = environment.blogBaseUrl;
  constructor(private http: HttpClient) {}

  createBlog(formData: FormData): Observable<HttpResponse<{ blogId: number }>> {
    return this.http
      .post<HttpResponse<{ blogId: number }>>(
        this.blogBaseUrl + '/create',
        formData
      )
      .pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          const errorMsg = error.error?.message || 'An unknown error occurred';
          return throwError(() => new Error(errorMsg));
        })
      );
  }

  getAllBlogs(
    page: number,
    size: number,
    sort: string
  ): Observable<HttpResponse<any>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<HttpResponse<any>>(this.blogBaseUrl + '/all', {
      params,
    });
  }

  getBlogById(id: number): Observable<HttpResponse<{ blog: Blog }>> {
    return this.http.get<HttpResponse<{ blog: Blog }>>(
      `${this.blogBaseUrl}/${id}`
    );
  }

  updateBlog(
    id: number,
    formData: FormData
  ): Observable<HttpResponse<{ blogId: number }>> {
    return this.http.put<HttpResponse<{ blogId: number }>>(
      `${this.blogBaseUrl}/update/${id}`,
      formData
    );
  }

  deleteBlog(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.blogBaseUrl}/${id}`);
  }
}
