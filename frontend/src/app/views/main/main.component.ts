import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ProductType } from '../../../types/product.type';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  products: ProductType[] = [];

  customOptions: OwlOptions = {
    margin: 24,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  customOptionsReviews: OwlOptions = {
    margin: 26,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };

  reviews = [
    {
      name: 'Irina',
      image: 'review1.png',
      text: 'In the assortment I found all the indoor plants that interested me. Prices are the best in the city. Delivery is very fast and takes care of the plants.',
    },
    {
      name: 'Anastasia',
      image: 'review2.png',
      text: 'Thank you very much! The areca flower is incredibly beautiful - just the bomb! Everyone is delighted with him! Thank you for the service - everything was done conveniently, delivered quickly. And a cute card is a nice bonus.',
    },
    {
      name: 'Ilya',
      image: 'review3.png',
      text: 'The store is super! This is the second time I order by courier, it was delivered in the best possible way. Your selection of indoor plants is impressive! Thank you for your good work!',
    },
    {
      name: 'Adeline',
      image: 'review4.jpg',
      text: 'I would like to thank the whole team for their help in choosing a gift for my mother! Everyone is simply delighted with the mini-garden! And the most important thing is that it is easy to care for, because I was given complete instructions in the kit.',
    },
    {
      name: 'Yanika',
      image: 'review5.jpg',
      text: 'Thank you very much for my updated collection of succulents! The service is simply 5+: fast, convenient, inexpensive. What else does a client need to be happy?',
    },
    {
      name: 'Marina',
      image: 'review6.jpg',
      text: 'For me, an important aspect has always been the presence of not only a physical store, but also an online market, because it is not always possible to come to the place. Never before have I seen such a huge assortment!',
    },
    {
      name: 'Stanislav',
      image: 'review7.jpg',
      text: 'I would like to thank consultant Irina for her help in choosing a flower for my wife. I have never seen such a reverent attitude towards a very difficult client who is difficult to please! Service is fire!',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getBestProducts().subscribe((data: ProductType[]) => {
      this.products = data;
    });
  }
}
