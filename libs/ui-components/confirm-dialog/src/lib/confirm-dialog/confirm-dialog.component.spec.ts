import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

import { provideTranslateService } from '@ngx-translate/core';

import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  function setup(data: ConfirmDialogData): void {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [provideTranslateService({ defaultLanguage: 'en' }), { provide: MAT_DIALOG_DATA, useValue: data }],
    });

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    fixture.detectChanges();
  }

  function el(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function buttons(): NodeListOf<HTMLButtonElement> {
    return el().querySelectorAll<HTMLButtonElement>('button');
  }

  it('should create', () => {
    setup({ titleKey: 'confirmLeave.title', messageKey: 'confirmLeave.message' });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the title key via translate pipe', () => {
    setup({ titleKey: 'confirmLeave.title', messageKey: 'confirmLeave.message' });
    expect(el().querySelector('[mat-dialog-title]')?.textContent?.trim()).toBe('confirmLeave.title');
  });

  it('renders the message key via translate pipe', () => {
    setup({ titleKey: 'confirmLeave.title', messageKey: 'confirmLeave.message' });
    expect(el().querySelector('mat-dialog-content')?.textContent?.trim()).toBe('confirmLeave.message');
  });

  it('renders provided cancelKey and confirmKey', () => {
    setup({
      titleKey: 't',
      messageKey: 'm',
      cancelKey: 'confirmLeave.stay',
      confirmKey: 'confirmLeave.leave',
    });
    expect(buttons()[0].textContent?.trim()).toBe('confirmLeave.stay');
    expect(buttons()[1].textContent?.trim()).toBe('confirmLeave.leave');
  });

  it('falls back to common.cancel and common.confirm when keys not provided', () => {
    setup({ titleKey: 't', messageKey: 'm' });
    expect(buttons()[0].textContent?.trim()).toBe('common.cancel');
    expect(buttons()[1].textContent?.trim()).toBe('common.confirm');
  });

  it('cancel button closes dialog with false', () => {
    setup({ titleKey: 't', messageKey: 'm' });
    const closeDirectives = fixture.debugElement
      .queryAll(By.directive(MatDialogClose))
      .map(de => de.injector.get(MatDialogClose));
    expect(closeDirectives[0].dialogResult).toBe(false);
  });

  it('confirm button closes dialog with true', () => {
    setup({ titleKey: 't', messageKey: 'm' });
    const closeDirectives = fixture.debugElement
      .queryAll(By.directive(MatDialogClose))
      .map(de => de.injector.get(MatDialogClose));
    expect(closeDirectives[1].dialogResult).toBe(true);
  });
});
