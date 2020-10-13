import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEmpleadosComponent } from './abm-empleados.component';

describe('AbmEmpleadosComponent', () => {
  let component: AbmEmpleadosComponent;
  let fixture: ComponentFixture<AbmEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
