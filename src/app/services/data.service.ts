import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';


@Injectable()
export class DataService {
  public url = environment.apiUrl + 'api/products';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getProducts() {
    return this.http.get(this.url);
  }

  // tslint:disable-next-line:typedef
  getProduct(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  // tslint:disable-next-line:typedef
  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
  // tslint:disable-next-line:typedef
  updateProduct(product: Product) {
    return this.http.put(this.url, product);
  }
  // tslint:disable-next-line:typedef
  deleteProduct(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
