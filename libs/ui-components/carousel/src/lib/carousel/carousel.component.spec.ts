import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent],
      providers: [provideTranslateService({ defaultLanguage: 'en' })],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('images', images);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts at index 0', () => {
    expect(component['currentIndex']()).toBe(0);
  });

  it('currentImage returns the image at the current index', () => {
    expect(component['currentImage']()).toBe('img1.jpg');
  });

  it('hasMultiple is true for multiple images', () => {
    expect(component['hasMultiple']()).toBe(true);
  });

  it('hasMultiple is false for a single image', () => {
    fixture.componentRef.setInput('images', ['only.jpg']);
    fixture.detectChanges();
    expect(component['hasMultiple']()).toBe(false);
  });

  it('next() advances to the next image', () => {
    component['next']();
    expect(component['currentIndex']()).toBe(1);
    expect(component['currentImage']()).toBe('img2.jpg');
  });

  it('next() wraps around from the last to the first image', () => {
    component['goTo'](2);
    component['next']();
    expect(component['currentIndex']()).toBe(0);
  });

  it('prev() moves to the previous image', () => {
    component['goTo'](1);
    component['prev']();
    expect(component['currentIndex']()).toBe(0);
  });

  it('prev() wraps around from the first to the last image', () => {
    component['prev']();
    expect(component['currentIndex']()).toBe(2);
  });

  it('goTo() sets a specific index', () => {
    component['goTo'](2);
    expect(component['currentIndex']()).toBe(2);
    expect(component['currentImage']()).toBe('img3.jpg');
  });

  it('ArrowRight key calls next()', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    component['onKeydown'](event);
    expect(component['currentIndex']()).toBe(1);
  });

  it('ArrowLeft key calls prev()', () => {
    component['goTo'](2);
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    component['onKeydown'](event);
    expect(component['currentIndex']()).toBe(1);
  });

  it('currentImage returns null for empty images array', () => {
    fixture.componentRef.setInput('images', []);
    fixture.detectChanges();
    expect(component['currentImage']()).toBeNull();
  });
});
