import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEtudComponent } from './ajout-etud.component';

describe('AjoutEtudComponent', () => {
  let component: AjoutEtudComponent;
  let fixture: ComponentFixture<AjoutEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutEtudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
