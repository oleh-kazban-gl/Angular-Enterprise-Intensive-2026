import { Injectable, signal } from '@angular/core';

import { FeedPost } from './feed.models';

const INITIAL_POSTS: FeedPost[] = [
  {
    id: '1',
    author: 'glitter_girl',
    time: '2h ago',
    image: 'https://picsum.photos/seed/1/1200/800',
    caption: 'Loving this sunset view! #sunset #photooftheday',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '2',
    author: 'city_sprinter',
    time: '5h ago',
    image: 'https://picsum.photos/seed/2/1200/800',
    caption: 'Morning run through the city keeps me energized 💪',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '3',
    author: 'coffee.junkie',
    time: '9h ago',
    image: 'https://picsum.photos/seed/3/1200/800',
    caption: 'Starting the day right — espresso + notebook ☕️📓',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '4',
    author: 'weekend.wanderer',
    time: '1d ago',
    image: 'https://picsum.photos/seed/4/1200/800',
    caption: 'Chasing waterfalls in the forest. #hiking #nature',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '5',
    author: 'techie_tom',
    time: '1d ago',
    image: 'https://picsum.photos/seed/5/1200/800',
    caption: 'New gadget drop! Time to dive into the latest SDK. 💻',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '6',
    author: 'foodie_fiona',
    time: '2d ago',
    image: 'https://picsum.photos/seed/6/1200/800',
    caption: 'Brunch goals. Avocado toast for the win 🥑✨',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '7',
    author: 'cityscape',
    time: '2d ago',
    image: 'https://picsum.photos/seed/7/1200/800',
    caption: 'Golden hour in the city. Those lights never sleep.',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '8',
    author: 'petpal',
    time: '3d ago',
    image: 'https://picsum.photos/seed/8/1200/800',
    caption: 'Meet my new buddy! 🐶 #puppylove',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '9',
    author: 'design_daily',
    time: '3d ago',
    image: 'https://picsum.photos/seed/9/1200/800',
    caption: 'Playing with gradients today—color is everything.',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
  {
    id: '10',
    author: 'nightowl',
    time: '4d ago',
    image: 'https://picsum.photos/seed/10/1200/800',
    caption: 'Late night code session: +1 coffee, -1 social life 😅',
    createdAt: new Date('2024-06-01T18:30:00'),
  },
];

@Injectable({ providedIn: 'root' })
export class FeedService {
  readonly posts = signal<FeedPost[]>([]);

  getPosts(): void {
    setTimeout(() => this.posts.set(INITIAL_POSTS), 3000);
  }
}
