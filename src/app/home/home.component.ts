import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="p-4 bg-light rounded-3">
      <h1 class="display-6">Welcome!!!</h1>
      <p class="lead">This is the Week 5 Angular + LocalStorage lab.</p>
    </div>
  `,
  imports: [CommonModule]
})
export class HomeComponent {}
