import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDatosComponent } from './juego-datos.component';

describe('JuegoDatosComponent', () => {
  let component: JuegoDatosComponent;
  let fixture: ComponentFixture<JuegoDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
