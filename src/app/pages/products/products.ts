import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductCard } from '../../components/product/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
})
export class Products {
  private breakpointObserver = inject(BreakpointObserver);

  protected readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 99.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 149.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 199.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for product 4',
      price: 249.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for product 5',
      price: 299.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for product 6',
      price: 349.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description for product 7',
      price: 399.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description for product 8',
      price: 449.99,
      image:
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
  ]);

  private readonly isXLarge = toSignal(this.breakpointObserver.observe(Breakpoints.XLarge));
  private readonly isLarge = toSignal(this.breakpointObserver.observe(Breakpoints.Large));
  private readonly isMedium = toSignal(this.breakpointObserver.observe(Breakpoints.Medium));

  protected readonly cols = computed(() => {
    if (this.isXLarge()?.matches) return 4;
    if (this.isLarge()?.matches) return 3;
    if (this.isMedium()?.matches) return 2;
    return 1;
  });
}
