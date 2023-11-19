import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {
  products:any[]=[];
  categories:any[]=[];
  cartProduct:any[]=[];
  constructor(private _services:SharedService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

getProducts()
{
  this._services.getAllProducts().subscribe((result:any)=>{
    this.products = result;
    //console.log(result);
  });
}
getCategories()
{
  this._services.getAllCategories().subscribe((result:any)=>{
    this.categories = result;
    //console.log(result);
  });
}

filterCategory(event:any)
  {
    let value = event.target.value;
    if(value == 'all')
    {
      this.getProducts()
    }
    else
    {
      this.getProCategory(value);
    }
       //console.log(value);
  }

  getProCategory(item:string)
  {
    this._services.getProByCategories(item).subscribe((result:any)=>{
        this.products = result;
    });
  }
  addToCart(event:any)
  {
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProduct.find(item => item.item.id == event.item.id);
      if(exist)
      {
        alert('already in cart')
      }
      else{
        this.cartProduct.push(event);
        localStorage.setItem("cart",JSON.stringify(this.cartProduct));
      }
    }
    else{
      this.cartProduct.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartProduct));
    }
  }

}
