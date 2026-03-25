import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-not-found',
  imports: [RouterModule, CardComponent, MatButtonModule, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
