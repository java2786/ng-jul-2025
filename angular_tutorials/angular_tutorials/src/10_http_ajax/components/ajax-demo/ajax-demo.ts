import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-ajax-demo',
  imports: [],
  templateUrl: './ajax-demo.html',
  styleUrl: './ajax-demo.scss'
})
export class AjaxDemo {
  private http = inject(HttpClient);
  products = []

  loadProducts(){
    this.http.get("https://fakestoreapi.com/products")
    .subscribe({
      next: (res:any)=>{
        console.log(res);
        this.products = res;
      },
      error: (err:any)=>{
        console.log("Error")
        console.log(err)
      }
    })
  }
}
