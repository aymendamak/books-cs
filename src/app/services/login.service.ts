import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private tokenSignal = signal<string | null>(null);
  public token = computed(() => this.tokenSignal());

  login(username: string, password: string) {
    this.http
      .post('http://localhost:8080/auth/login', {
        username,
        password,
      })
      .subscribe({
        next: (res: any) => {
          this.tokenSignal.set(res.token);
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', username);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error fetching authors:', error);
        },
      });
  }

  isAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    return !!token;
  }
}
