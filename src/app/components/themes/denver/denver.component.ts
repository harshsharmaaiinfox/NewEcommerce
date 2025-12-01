import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { GetProductByIds } from '../../../shared/action/product.action';
import { Denver } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from '../../../shared/data/owl-carousel';
import { GetBrands } from '../../../shared/action/brand.action';
import { GetStores } from '../../../shared/action/store.action';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-denver',
  templateUrl: './denver.component.html',
  styleUrls: ['./denver.component.scss']
})
export class DenverComponent implements OnInit {

  @Input() data?: Denver;
  @Input() slug?: string;

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public categorySlider = data.categorySlider9;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) { }

  public exploreMoreItems = [
    {
      image: 'assets/images/women1.jpg',
      title: 'BRIDAL LEHENGA'
    },
    {
      image: 'assets/images/women2.jpg',
      title: 'WEDDING SAREE'
    },
    {
      image: 'assets/images/women3.jpg',
      title: 'RECEPTION GOWN'
    },
    {
      image: 'assets/images/women4.jpg',
      title: 'HALDI OUTFIT'
    }
  ];


  public featuredProduct: any;

  ngOnInit() {
    if (this.data?.slug == this.slug) {
      const getProducts$ = this.store.dispatch(new GetProductByIds({
        status: 1,
        paginate: this.data?.content?.products_ids.length,
        ids: this.data?.content?.products_ids?.join(',')
      }));
      const getBrand$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brands?.brand_ids?.join()
      }));
      const getStore$ = this.store.dispatch(new GetStores({
        status: 1,
        ids: this.data?.content?.seller?.store_ids?.join()
      }));

      // Skeleton Loader
      document.body.classList.add('skeleton-body');

      forkJoin([getProducts$, getBrand$, getStore$]).subscribe({
        complete: () => {
          document.body.classList.remove('skeleton-body');
          this.themeOptionService.preloader = false;

          // Select the first product as featured
          this.store.select(state => state.product.productByIds).subscribe(products => {
            if (products && products.length > 0) {
              this.featuredProduct = products[0];
            }
          });
        }
      });
    }

    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.data['data'].theme_option.productBox === 'digital') {
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {
            ...this.productSlider6ItemMargin, items: 4, responsive: {
              ...this.productSlider6ItemMargin.responsive,
              1180: {
                items: 4
              }
            }
          }
        }
      } else {
        if (this.productSlider6ItemMargin && this.productSlider6ItemMargin.responsive && this.productSlider6ItemMargin.responsive['1180']) {
          this.productSlider6ItemMargin = {
            ...this.productSlider6ItemMargin, items: 6, responsive: {
              ...this.productSlider6ItemMargin.responsive,
              1180: {
                items: 6
              }
            }
          }
        }
      }
    })
  }

}
