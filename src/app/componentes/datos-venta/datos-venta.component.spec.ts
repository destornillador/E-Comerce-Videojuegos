import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVentaComponent } from './datos-venta.component';

describe('DatosVentaComponent', () => {
  let component: DatosVentaComponent;
  let fixture: ComponentFixture<DatosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
