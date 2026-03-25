import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CardComponent } from '@gl/ui-components/card';

import { ProfileService } from './profile.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-profile',
  imports: [CommonModule, CardComponent, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  protected readonly profile = this.profileService.profile;

  ngOnInit(): void {
    this.profileService.getProfile();
  }
}
