import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.id}`
      }
    });
  }

  return next(req);
};