import { Component, computed } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { CartService } from 'app/cart/cart.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {
  errorMessage = '';

  vehicle = this.vehicleService.selectedVehicle;

  pageTitle = computed(() => this.vehicle() ?  `Detail for: ${this.vehicle()?.name}` : '');

  vehicleFilms = this.vehicleService.vehicleFilms;

  constructor(private vehicleService: VehicleService,
    private cartService: CartService) { }

  addToCart(vehicle: Vehicle | undefined) {
    if(vehicle)
      this.cartService.addToCart(vehicle);
  }
}
