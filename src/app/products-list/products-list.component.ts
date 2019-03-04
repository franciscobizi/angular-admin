import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-produts-list',
  templateUrl:'./products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  message:string = '';
  products : any[];
  productsById : any[];
  row : boolean = true;
  constructor(private productService : ProductsService){}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      res => {
          this.products = res['product'];
      },
      err => {
        console.log(err)
      }
    );
  }
  /**
   * add new product by submiting form
   * @param name 
   * @param price 
   * @param amount 
   */
  onAddProduct(name : string, price : string, amount : string){
    var data = {name : name, price : price, amount : amount};
    this.productService.createProduct(data).subscribe(
       res => {this.message = res['message']},
       err => {console.log(err)}
    );
  }

  /**
   * getting product by id
   * @param id 
   */
  onProductById(id : string){
    this.productService.getProducts(id).subscribe(
      res => {
        this.products = res['product'];
      },
      err => {console.log(err)}
   );
  }

  /**
   * changing limit of items in the page
   * @param event 
   */
  onPageNumber(event){
    var limit = event.target.value;
    this.productService.getProductsByLimit(limit).subscribe(
        res => {
          this.products = res['product'];
        },
        err => {console.log(err)}
    );
  }

  //close message alert
  onCloseAlert(){
    this.message = "";
  }

}
