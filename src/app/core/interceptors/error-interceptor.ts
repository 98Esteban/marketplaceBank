import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: any) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          errorMessage = 'No se pudo conectar al servidor';
        } else if (error.status >= 400 && error.status < 500) {
          errorMessage = error.error?.message || `Error del cliente: ${error.status}`;
        } else if (error.status >= 500) {
          errorMessage = 'Error interno del servidor';
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = error.message || 'Error de conexión';
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      console.error('HTTP Error:', {
        status: error?.status || 'unknown',
        message: errorMessage,
        url: error?.url || req.url,
        error: error
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};
