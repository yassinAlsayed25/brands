import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http:HttpClient) { }


  getAllProducts()
  {
    return this._http.get('https://fakestoreapi.com/products');
  }


  getAllCategories()
  {
    return this._http.get('https://fakestoreapi.com/products/categories')
  }


  getProByCategories(item:string)
  {
    return this._http.get('https://fakestoreapi.com/products/categories/'+ item)
  }

  getProById(id:any)
  {
    return this._http.get('https://fakestoreapi.com/products/'+ id);
  }

  createNewCart(model:any)
  {
    return this._http.post('https://fakestoreapi.com/carts',model)

  }

}
