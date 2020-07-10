import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from '../models/product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'products-root',
  templateUrl: './products.component.html',
  providers: [DataService]
})
export class ProductsComponent implements OnInit {

  product: Product = new Product();   // изменяемый товар
  products: Product[];                // массив товаров
  tableMode = true;          // табличный режим

  constructor(private dataService: DataService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadProducts();    // загрузка данных при старте компонента
  }
  // получаем данные через сервис
  // tslint:disable-next-line:typedef
  loadProducts() {
    this.dataService.getProducts()
      .subscribe((data: Product[]) => this.products = data);
  }
  // сохранение данных
  // tslint:disable-next-line:typedef
  save() {
    if (this.product.id == null) {
      this.dataService.createProduct(this.product)
        .subscribe((data: Product) => this.products.push(data));
    } else {
      this.dataService.updateProduct(this.product)
        .subscribe(data => this.loadProducts());
    }
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editProduct(p: Product) {
    this.product = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.product = new Product();
    this.tableMode = true;
  }
  // tslint:disable-next-line:typedef
  delete(p: Product) {
    this.dataService.deleteProduct(p.id)
      .subscribe(data => this.loadProducts());
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
    this.tableMode = false; // github
  }
}
