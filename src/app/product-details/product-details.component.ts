import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  data:any={};
  constructor(private _router:ActivatedRoute,private _services:SharedService) {
    this.id = this._router.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct()
  {
    this._services.getProById(this.id).subscribe((result)=>{
      this.data=result;
    })
  }

}
