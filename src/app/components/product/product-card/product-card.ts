import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<IProduct>();
  protected readonly isWishlisted = signal(false);

  protected toggleWishlist() {
    this.isWishlisted.update(value => !value);
  }
}
