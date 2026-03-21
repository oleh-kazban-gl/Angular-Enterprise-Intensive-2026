import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CardComponent } from '@gl/ui-components/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-profile',
  imports: [CommonModule, CardComponent, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  protected readonly cardTestInput = 'Profile: this is test input for Card';

  protected stats = {
    posts: 34,
    followers: 1200,
    following: 368,
  };

  protected onCardFooterClick(): void {
    console.log('Profile received Card footer click event');
  }
}
