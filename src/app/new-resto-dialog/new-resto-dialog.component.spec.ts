import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRestoDialogComponent } from './new-resto-dialog.component';

describe('NewRestoDialogComponent', () => {
  let component: NewRestoDialogComponent;
  let fixture: ComponentFixture<NewRestoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRestoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRestoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
