import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as GeoFire from 'geofire';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { Product } from '../product.model';

@Injectable()
export class TramService {
  geoFire: any;

  constructor(
    private afd: AngularFireDatabase,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    const ref = this.afd.database.ref().child('tramStop');
    this.geoFire = new GeoFire(ref);
  }

  getTramStop() {
    return this.http.get('https://wanderdrone.appspot.com/');
  }

  updateLocationTramById(id: string) {}

  getLocations(radius: number, coords: Array<number>, tramId: string) {
    this.geoFire
      .query({
        center: coords,
        radius: radius,
      })
      .on('key_entered', (key, location, distance) => {
        let hit = {
          location: location,
          distance: distance,
        };
        console.log('[key]: ', key);
        console.log('[hit]: ', hit);

        // this.updateTramCoordByTramId(tramId, [coords[1], coords[0]])

        this.getTramStopInfo(key).subscribe((stop: TramStop) => {
          console.log(stop);
          if (!!stop) {
            this.updateTramLocationByTramId(tramId, stop);
          }
        });
      });
  }

  updateTramLocationByTramId(tramId, stop: TramStop) {
    console.log(tramId);
    const itemRef = this.afs
      .doc('trams/tramInfo')
      .collection('tram')
      .doc(tramId);
    return itemRef.update({
      next: stop.next,
    });
  }

  updateTramCoordByTramId(tramId, coords: Array<number>) {
    const itemRef = this.afs
      .doc('trams/tramInfo')
      .collection('tram')
      .doc(tramId);
    return itemRef.update({
      'geolocation.geometry.coordinates': coords,
    });
  }

  getDemoCoord() {
    return this.http
      .get('../../assets/demoTram.json')
      .pipe(map(coords => coords[0].coords));
  }

  getTramStopInfo(key) {
    const itemRef = this.afd.object(`tramStopInfo/${key}`);
    return itemRef.valueChanges();
  }

  setTramStop(key, coords) {
    this.geoFire
      .set(key, coords)
      .then(() => console.log('[location added]: success'))
      .catch(err => console.log('[location err]: ', err));
  }

  setTramStopInfo(key, data) {
    this.afd
      .list('tramStopInfo')
      .set(key, data)
      .then(() => console.log('[info added]: success'))
      .catch(err => console.log('[info err]: ', err));
  }

  getD() {
    return this.afd
      .list('/products', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = { key, ...a.payload.val() };
          return data;
        });
      });
  }
}

interface TramStop {
  id: any;
  next: any;
  prev: any;
}
