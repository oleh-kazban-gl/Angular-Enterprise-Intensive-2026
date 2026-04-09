import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { SettingsEffects } from './settings.effects';
import { SettingsActions } from './settings.actions';
import { SettingsService } from './settings.service';
import { AppSettings } from './settings.models';

jest.mock('./settings.service');

const mockSettings: AppSettings = {
  languages: [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'German' },
  ],
};

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions$: Subject<Action>;
  let settingsService: jest.Mocked<SettingsService>;

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [SettingsEffects, provideMockActions(() => actions$), SettingsService],
    });

    effects = TestBed.inject(SettingsEffects);
    settingsService = TestBed.inject(SettingsService) as jest.Mocked<SettingsService>;
  });

  describe('loadSettings$', () => {
    it('dispatches loadSettingsSuccess on success', async () => {
      settingsService.getSettings.mockReturnValue(of(mockSettings));
      const result = firstValueFrom(effects.loadSettings$);
      actions$.next(SettingsActions.loadSettings());
      expect(await result).toEqual(SettingsActions.loadSettingsSuccess({ settings: mockSettings }));
    });

    it('dispatches loadSettingsFailure on error', async () => {
      settingsService.getSettings.mockReturnValue(throwError(() => new Error('load error')));
      const result = firstValueFrom(effects.loadSettings$);
      actions$.next(SettingsActions.loadSettings());
      expect(await result).toEqual(SettingsActions.loadSettingsFailure({ error: 'load error' }));
    });
  });
});
