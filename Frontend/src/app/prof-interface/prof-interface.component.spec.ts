import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfInterfaceComponent } from './prof-interface.component';

describe('ProfInterfaceComponent', () => {
  let component: ProfInterfaceComponent;
  let fixture: ComponentFixture<ProfInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
