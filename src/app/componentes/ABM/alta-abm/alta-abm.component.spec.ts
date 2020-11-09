import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAbmComponent } from './alta-abm.component';

describe('AltaAbmComponent', () => {
  let component: AltaAbmComponent;
  let fixture: ComponentFixture<AltaAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
