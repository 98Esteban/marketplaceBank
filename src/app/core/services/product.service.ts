import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly fakeStoreApi = environment.fakeStoreApi;
  private readonly platziApi = environment.platziApi;

  constructor(private http: HttpClient) { }



  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.fakeStoreApi).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.fakeStoreApi}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }


  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.fakeStoreApi}/categories`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Algo salió mal';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión.';
      } else {
        errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
      }
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message || 'Error desconocido';
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.error('Service Error:', {
      message: errorMessage,
      status: error?.status || 'unknown',
      error: error
    });

    return throwError(() => new Error(errorMessage));
  }
}
