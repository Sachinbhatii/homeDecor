import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment.development";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {CartItemType} from "../../../../types/cartItem.type";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  products: FavoriteType[] = [];
  serverStaticPath = environment.serverStaticPath;
  count = 1;


  constructor(private favoriteService: FavoriteService,
              private cartService: CartService) {
  }


  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        this.products = data as FavoriteType[];


        if (this.products && this.products.length > 0) {
          this.cartService.getCart()
            .subscribe((cartData: CartType | DefaultResponseType) => {
              if ((cartData as DefaultResponseType).error !== undefined) {
                const error = (cartData as DefaultResponseType).message;
                throw new Error(error);
              }

              const cartItems = (cartData as CartType).items;

              if (cartItems && cartItems.length > 0) {

                this.products.forEach((product: FavoriteType) => {
                  const foundElement = cartItems.find(item => item.product.id === product.id);
                  const condition = !!foundElement;

                  product.isInCart = condition ? condition : false;
                  product.count = foundElement?.quantity ? foundElement?.quantity : 1;
                });
              } else {
                this.products.forEach((product: FavoriteType) => {
                  product.isInCart = false;
                  product.count = 1;
                });
              }


            });
        }
      });
  }

  addToCart(product: FavoriteType) {
    const id = product.id;
    let count = product.count;

    if (count === undefined) {
      count = 1;
      console.warn('count is undefined in FavoriteComponent at addToCart function');
    }

    this.cartService.updateCart(id, count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        product.isInCart = true;

      });

  }


  removeFromFavorites(id: string) {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message);
        }

        this.products = this.products.filter(item => item.id !== id);
      });
  }

  removeFromCart(product: FavoriteType) {
    this.cartService.updateCart(product.id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        product.count = 1;
        product.isInCart = false;
      });
  }

  updateCount(product: FavoriteType, event: number) {

    product.count = event;

    if(product.isInCart){
      this.cartService.updateCart(product.id, event)
        .subscribe((cartData: CartType | DefaultResponseType) => {
          if ((cartData as DefaultResponseType).error !== undefined) {
            const error = (cartData as DefaultResponseType).message;
            throw new Error(error);
          }
        });
    }
  }
}
