import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { CardComponent } from '@gl/ui-components/card';

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
  selector: 'gl-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, CardComponent, MatButtonModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly postId = signal<string | null>(null);
  protected readonly post = computed(() => posts.find(p => p.id === this.postId()) ?? null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.postId.set(id);
    }
  }

  protected goBack() {
    this.router.navigate(['/feed']);
  }

  protected like() {
    const current = this.post();

    if (!current) {
      return;
    }

    current.likes = (current.likes || 0) + 1;
  }
}
