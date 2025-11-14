import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="flex flex-col min-h-screen w-full">
      <!-- Header - Fixed wrapper with full width background -->
      <div class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-300">
        <div class="max-w-[1400px] mx-auto px-4 md:px-6">
          <app-header />
        </div>
      </div>

      <!-- Spacer for fixed header -->
      <div class="h-16 md:h-20"></div>

      <!-- Main Content Container -->
      <div class="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 my-auto">
        <router-outlet />
      </div>

      <!-- Footer -->
      <div class="bg-white border-t border-neutral-300 mt-10">
        <div class="max-w-[1400px] mx-auto px-4 md:px-6">
          <app-footer />
        </div>
      </div>
    </div>
  `,
})
export class App {}
