import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';

@Component({
  selector: 'gl-create-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {}
