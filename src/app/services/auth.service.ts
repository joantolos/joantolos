import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface SessionResponse {
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authenticatedSubject = new BehaviorSubject<boolean>(false);
  readonly authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<SessionResponse>(
      `${environment.backendUrl}/auth/login`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      map((response) => response.authenticated),
      tap((authenticated) => this.authenticatedSubject.next(authenticated)),
      catchError(() => {
        this.authenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post<SessionResponse>(
      `${environment.backendUrl}/auth/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      map((response) => response.authenticated),
      tap(() => this.authenticatedSubject.next(false)),
      catchError(() => {
        this.authenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  checkSession(): Observable<boolean> {
    return this.http.get<SessionResponse>(
      `${environment.backendUrl}/auth/session`,
      { withCredentials: true }
    ).pipe(
      map((response) => response.authenticated),
      tap((authenticated) => this.authenticatedSubject.next(authenticated)),
      catchError(() => {
        this.authenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  redirectToLogin(): void {
    this.router.navigate(['/finance/login']);
  }
}
