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
  productOpen;
  selectedProduct: IProduct;

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
  onEdit(product) {
    this.productOpen = true;
    this.selectedProduct = product;
  }
  addProduct() {
    this.productOpen = true;
    this.selectedProduct = undefined;
  }
  handleFinish(event) {
    if (event && event.product) {
      if (this.selectedProduct) {
        //Edit Flow
        this.productsService.editProduct(
          this.selectedProduct.id,
          event.product
        );
      } else {
        //Save New
        this.productsService.addProduct(event.product);
      }
    }
    this.productOpen = false;
  }
  ngOnInit(): void {}
}
