import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TramService } from '../../services/tram.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import {Product} from '../../product.model'

@Component({
  selector: 'app-control-tram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './control-tram.component.html',
  styleUrls: ['./control-tram.component.css'],
})
export class ControlTramComponent implements OnInit {
  tram$: Observable<any>;

  products: Product[]

  constructor(private tramService: TramService) {}

  ngOnInit() {
    /* this.setLocation() */
    this.tram$ = this.tramService.getTramStop().pipe(
      tap(t => {
        console.log(t);
      })
    );

    this.tramService.getD().subscribe((products: Product[]) => this.products = products)
  }

  getNearlyTramStop() {
    const coords = [13.964742497737149, 100.58753035127921];
    this.tramService.getLocations(0.02, coords, 'wOGqFrpRsN6nEw2S9yU2');
  }

  demoTram() {
    this.tramService.getDemoCoord().subscribe(coords => {
      console.table(coords);
      let coord = 0;
      let timer = window.setInterval(() => {
        if (coord < coords.length) {
          this.tramService.getLocations(
            0.02,
            [coords[coord][1], coords[coord][0]],
            'wOGqFrpRsN6nEw2S9yU2'
          );
          this.tramService.updateTramCoordByTramId(
            'wOGqFrpRsN6nEw2S9yU2',
            coords[coord]
          );
          coord++;
        } else {
          window.clearInterval(timer);
          console.log('[end]');
        }
      }, 3000);
    });
  }

  setLocation() {
    const TramStop = [
      {
        id: 'tramStop1',
        coords: [13.963950968221127, 100.58704290201325],
        next: 'tramStop2',
        prev: 'tramStop12',
      },
      {
        id: 'tramStop2',
        coords: [13.963809706273693, 100.58643821675071],
        next: 'tramStop3',
        prev: 'tramStop1',
      },
      {
        id: 'tramStop3',
        coords: [13.96464331622397, 100.5860211382672],
        next: 'tramStop4',
        prev: 'tramStop2',
      },
      {
        id: 'tramStop4',
        coords: [13.965242291375432, 100.58586915706536],
        next: 'tramStop5',
        prev: 'tramStop3',
      },
      {
        id: 'tramStop5',
        coords: [13.965932893234779, 100.58568473671693],
        next: 'tramStop6',
        prev: 'tramStop4',
      },
      {
        id: 'tramStop6',
        coords: [13.967816702557343, 100.58543649504173],
        next: 'tramStop7',
        next_alt: 'tramStop8',
        prev: 'tramStop5',
      },
      {
        id: 'tramStop7',
        coords: [13.968171770389873, 100.58727968494793],
        next: 'tramStop8',
        prev: 'tramStop6',
      },
      {
        id: 'tramStop8',
        coords: [13.967751395510689, 100.58653042887244],
        next: 'tramStop9',
        prev: 'tramStop7',
      },
      {
        id: 'tramStop9',
        coords: [13.966373422794746, 100.5868259846435],
        next: 'tramStop10',
        prev: 'tramStop8',
      },
      {
        id: 'tramStop10',
        coords: [13.965734194776317, 100.58731113066682],
        next: 'tramStop11',
        prev: 'tramStop9',
      },
      {
        id: 'tramStop11',
        coords: [13.964809625256322, 100.58754033719754],
        next: 'tramStop12',
        prev: 'tramStop10',
      },
      {
        id: 'tramStop12',
        coords: [13.964124703952862, 100.58745749706407],
        next: 'tramStop1',
        prev: 'tramStop11',
      },
    ];
    TramStop.forEach(tramStop => {
      this.tramService.setTramStop(tramStop.id, tramStop.coords);
      this.tramService.setTramStopInfo(tramStop.id, tramStop);
    });
  }
}
