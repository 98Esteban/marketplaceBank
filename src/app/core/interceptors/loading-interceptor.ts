import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';
let loadingCount = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingCount++;
  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      loadingCount--;
      if (loadingCount === 0) {
        loadingService.setLoading(false);
      }
    })
  );
};