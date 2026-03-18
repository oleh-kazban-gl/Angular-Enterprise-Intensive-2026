import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface FeedPost {
  id: string;
  author: string;
  time: string;
  image: string;
  caption: string;
  likes?: number;
}

const posts: FeedPost[] = [
  {
    id: '1',
    author: 'glitter_girl',
    time: '2h ago',
    image: 'https://picsum.photos/seed/1/1200/800',
    caption: 'Loving this sunset view! #sunset #photooftheday',
  },
  {
    id: '2',
    author: 'city_sprinter',
    time: '5h ago',
    image: 'https://picsum.photos/seed/2/1200/800',
    caption: 'Morning run through the city keeps me energized 💪',
  },
  {
    id: '3',
    author: 'coffee.junkie',
    time: '9h ago',
    image: 'https://picsum.photos/seed/3/1200/800',
    caption: 'Starting the day right — espresso + notebook ☕️📓',
  },
  {
    id: '4',
    author: 'weekend.wanderer',
    time: '1d ago',
    image: 'https://picsum.photos/seed/4/1200/800',
    caption: 'Chasing waterfalls in the forest. #hiking #nature',
  },
  {
    id: '5',
    author: 'techie_tom',
    time: '1d ago',
    image: 'https://picsum.photos/seed/5/1200/800',
    caption: 'New gadget drop! Time to dive into the latest SDK. 💻',
  },
  {
    id: '6',
    author: 'foodie_fiona',
    time: '2d ago',
    image: 'https://picsum.photos/seed/6/1200/800',
    caption: 'Brunch goals. Avocado toast for the win 🥑✨',
  },
  {
    id: '7',
    author: 'cityscape',
    time: '2d ago',
    image: 'https://picsum.photos/seed/7/1200/800',
    caption: 'Golden hour in the city. Those lights never sleep.',
  },
  {
    id: '8',
    author: 'petpal',
    time: '3d ago',
    image: 'https://picsum.photos/seed/8/1200/800',
    caption: 'Meet my new buddy! 🐶 #puppylove',
  },
  {
    id: '9',
    author: 'design_daily',
    time: '3d ago',
    image: 'https://picsum.photos/seed/9/1200/800',
    caption: 'Playing with gradients today—color is everything.',
  },
  {
    id: '10',
    author: 'nightowl',
    time: '4d ago',
    image: 'https://picsum.photos/seed/10/1200/800',
    caption: 'Late night code session: +1 coffee, -1 social life 😅',
  },
];

@Component({
  selector: 'gl-feed',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  protected readonly title = 'InstaGLam';
  protected readonly posts = signal<FeedPost[]>([]);

  protected trackByPost = (_index: number, post: FeedPost) => post.id;

  likePost(post: FeedPost): void {
    post.likes = (post.likes || 0) + 1;
  }

  addPosts(): void {
    this.posts.set(posts);
  }
}
