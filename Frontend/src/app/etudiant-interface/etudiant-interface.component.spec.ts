import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantInterfaceComponent } from './etudiant-interface.component';

describe('EtudiantInterfaceComponent', () => {
  let component: EtudiantInterfaceComponent;
  let fixture: ComponentFixture<EtudiantInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
