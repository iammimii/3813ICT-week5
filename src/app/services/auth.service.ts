import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<User | null> {
    const res = await firstValueFrom(this.http.post<User | { valid: false }>(this.api, { email, password }));
    if ('valid' in res && res.valid) {
      localStorage.setItem('currentUser', JSON.stringify(res));
      return res as User;
    }
    return null;
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('currentUser');
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  updateCurrentUser(data: Partial<User>) {
    const cur = this.getCurrentUser();
    if (!cur) return;
    const updated = { ...cur, ...data };
    localStorage.setItem('currentUser', JSON.stringify(updated));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
