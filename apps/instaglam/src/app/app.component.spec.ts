import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { NavmenuComponent } from '@gl/feature-navmenu';
import { AppComponent } from './app.component';

@Component({ selector: 'gl-navmenu', template: '' })
class NavmenuStub {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideMockStore(), provideTranslateService({ defaultLanguage: 'en' })],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [NavmenuComponent] },
        add: { imports: [NavmenuStub] },
      })
      .compileComponents();
  });

  it('should create', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
