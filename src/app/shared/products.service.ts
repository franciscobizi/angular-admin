import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor(private http : HttpClient) { }

    /**
     * create new product in the table
     * @param products
     */
    createProduct(products : any){
      return this.http.post(environment.BASE_URL + '/products', products);
    }

    /**
     * fetch products from the table
     * @param products 
     */
    getProducts(id : string = null){
      var param = id == null ? '/products' : '/products/' + id;
      return this.http.get(environment.BASE_URL + param);
    }

    /**
     * fetch products from the table setting limit
     * @param products 
     */
    getProductsByLimit(limit : string){
      var param = '/products/page?limit=' + limit;
      return this.http.get(environment.BASE_URL + param);
    }

    /**
     * update product in the table
     * @param products 
     */
    updateProduct(products : any, id:string){
      return this.http.put(environment.BASE_URL + '/products/' + id, products);
    }

    /**
     * delete product from the table
     * @param id 
     */
    deleteProduct(id: string){
      return this.http.delete(environment.BASE_URL + '/products/' + id);
    }
}
