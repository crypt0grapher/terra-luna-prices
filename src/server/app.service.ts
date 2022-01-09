import { Injectable, NotFoundException } from '@nestjs/common';
import { from, of, toArray } from 'rxjs';

const PRICES = [
  { title: 'Lorem Ipsum', id: 1 },
  { title: 'Dolore Sit', id: 2 },
  { title: 'Amet', id: 3 },
];

@Injectable()
export class AppService {
  getPrices() {
    return from(PRICES).pipe(toArray());
  }

  getPrice(postId: number) {
    const Price = PRICES.find(({ id }) => id === postId);

    if (!Price) {
      throw new NotFoundException();
    }

    return of(Price);
  }
}