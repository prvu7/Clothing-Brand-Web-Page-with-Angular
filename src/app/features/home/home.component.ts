import { Component, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Clothes } from '../../core/clothes/clothes.interface';
import { ClothesService } from '../../core/clothes/clothes.service';
import { CartService } from '../../core/cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() defaultQuantity: number = 1;
  @Output() productAdded = new EventEmitter<{ product: Clothes, quantity: number }>();

  discountSignal = signal(0); 

  bestSellers: Clothes[] = [];
  newReleases: Clothes[] = [];
  jeans: Clothes[] = [];
  tops: Clothes[] = [];

  quantityByProduct: { [id: number]: number } = {};
  cartNotification: string = '';

  isSearchVisible: boolean = false;
  searchQuery: string = '';
  allClothes: Clothes[] = [];
  filteredClothes: Clothes[] = [];

  constructor(
    private clothesService: ClothesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bestSellers = this.clothesService.getBestSellers();
    this.newReleases = this.clothesService.getNewReleases();
    this.jeans = this.clothesService.getJeans();
    this.tops = this.clothesService.getTops();

    const allProducts: Clothes[] = [
      ...this.bestSellers,
      ...this.newReleases,
      ...this.jeans,
      ...this.tops
    ];
    allProducts.forEach(product => {
      this.quantityByProduct[product.id] = this.defaultQuantity;
    });

    this.allClothes = [...allProducts];
    this.filteredClothes = [];
  }

  onQuantityChange(productId: number, newQuantity: number) {
    this.quantityByProduct[productId] = newQuantity;
    console.log(`Quantity for product ${productId} changed to ${newQuantity}`);
  }

  addToCart(item: Clothes): void {
    const quantity = this.quantityByProduct[item.id] || this.defaultQuantity;
    this.cartService.addToCart(item, quantity);  
    console.log('Added to cart:', item, 'Quantity:', quantity);
    this.productAdded.emit({ product: item, quantity });

    this.cartNotification = 'ADDED TO CART!';
    setTimeout(() => {
      this.cartNotification = '';
    }, 3000)
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = '';
      this.filteredClothes = []; 
    }
  }
  
  filterClothes(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredClothes = query === ''
      ? [] 
      : this.allClothes.filter(item => item.name.toLowerCase().includes(query));
  }  
}