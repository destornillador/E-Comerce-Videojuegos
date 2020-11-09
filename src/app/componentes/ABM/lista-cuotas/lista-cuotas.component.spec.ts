import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCuotasComponent } from './lista-cuotas.component';

describe('ListaCuotasComponent', () => {
  let component: ListaCuotasComponent;
  let fixture: ComponentFixture<ListaCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
