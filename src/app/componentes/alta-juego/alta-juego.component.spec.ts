import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaJuegoComponent } from './alta-juego.component';

describe('AltaJuegoComponent', () => {
  let component: AltaJuegoComponent;
  let fixture: ComponentFixture<AltaJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
