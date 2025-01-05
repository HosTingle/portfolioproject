import { Component } from '@angular/core';
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {
constructor( private router:Router){

}
ngOnInit(){

}

route(){
  this.router.navigate(["login"]); 
}
}
