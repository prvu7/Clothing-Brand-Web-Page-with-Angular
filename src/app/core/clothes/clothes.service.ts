import { Injectable } from '@angular/core';
import { Clothes } from './clothes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private bestSellers: Clothes[] = [
    { id: 1, name: 'CAMO HOODIE', price: 109, imageUrl: 'assets/images/best-sellers/hoodie-camo.png' },
    { id: 2, name: 'USA TOUR SHIRT', price: 60, imageUrl: 'assets/images/best-sellers/usa-tour-tee.png' },
    { id: 3, name: 'PINCHED FLARE DENIM', price: 109, imageUrl: 'assets/images/best-sellers/flare-denim-pinch.png' }
  ];

  private newReleases: Clothes[] = [
    { id: 4, name: 'GON RODEO TEE', price: 45, imageUrl: 'assets/images/new-realeses/gon-rodeo-tee-black.png' },
    { id: 5, name: 'ZIPPER HOODIE - WASHED', price: 75, imageUrl: 'assets/images/new-realeses/zipper-hoodie.png' },
    { id: 6, name: 'ART RETRO JACKET', price: 119, imageUrl: 'assets/images/new-realeses/retro-jacket.png' }
  ];

  private jeans: Clothes[] = [
    { id: 7, name: 'FLARE DENIM - CREAM WASH', price: 109, imageUrl: 'assets/images/jeans/flare-denim-distrassed.png' },
    { id: 8, name: 'SAKURA FLARE DENIM', price: 109, imageUrl: 'assets/images/jeans/flare-denim-flowers.png' },
    { id: 9, name: 'FLARE DENIM - WAVES', price: 109, imageUrl: 'assets/images/jeans/flare-denim-waves.png' }
  ];

  private tops: Clothes[] = [
    { id: 10, name: 'BULLET PROOF TEE', price: 45, imageUrl: 'assets/images/tops/bullet-proof-tee.png' },
    { id: 11, name: 'PINK JERSEY', price: 55, imageUrl: 'assets/images/tops/pink-jersey.png' },
    { id: 12, name: 'MESH JERSEY - BLACK', price: 45, imageUrl: 'assets/images/tops/jersey-00.png' }
  ];

  getBestSellers(): Clothes[] {
    return this.bestSellers;
  }

  getNewReleases(): Clothes[] {
    return this.newReleases;
  }

  getJeans(): Clothes[] {
    return this.jeans;
  }

  getTops(): Clothes[] {
    return this.tops;
  }
}
