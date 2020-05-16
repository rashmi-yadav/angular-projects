import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService, IProduct } from '../product.service';

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products$: Observable<IProduct[]> = this.productsService.products$;
  delete = false;
  productToBeDeleted;

  constructor(private productsService: ProductService) {}
  trackById(index, item) {
    return item.id;
  }
  onDelete(product) {
    this.delete = true;
    this.productToBeDeleted = product;
  }
  handleCancel() {
    this.delete = false;
  }
  confirmDelete() {
    this.handleCancel();
    this.productsService.removeProduct(this.productToBeDeleted);
  }
  ngOnInit(): void {}
}
