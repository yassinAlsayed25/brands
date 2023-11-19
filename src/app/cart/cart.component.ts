import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _services:SharedService) { }
  cartProduct:any[]=[];
  total:any=0;
  success:boolean=false;


  ngOnInit(): void {
    this.getCartProducts();
  }


  getCartProducts()
  {
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
  }
  this.getCartTotal();
}

addAmount(index:number)
{
    this.cartProduct[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart",JSON.stringify(this.cartProduct));
}

minsAmount(index:number)
{
  this.cartProduct[index].quantity--;
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProduct));
}

detectChange()
{
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProduct));
}

getCartTotal()
{
  this.total = 0;
  for(let x in this.cartProduct)
  {
    this.total += this.cartProduct[x].item.price * this.cartProduct[x].quantity;
  }
}
deleteProduct(index:number)
{
  this.cartProduct.splice(index , 1);
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProduct));
}
clearCart()
{
  this.cartProduct = [];
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProduct));
}


addCart()
{
  let products = this.cartProduct.map(item =>{
    return {productId:item.item.id, quantity:item.quantity}
  });
  let model ={
    userId:5,
    date:new Date(),
    products:products
  }

  this._services.createNewCart(model).subscribe((result) =>{
    this.success = true;
  })
  console.log(model)
}

}
