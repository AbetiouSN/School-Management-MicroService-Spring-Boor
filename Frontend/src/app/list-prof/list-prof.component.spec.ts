import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfListComponent } from './list-prof.component';

describe('ListProfComponent', () => {
  let component: ProfListComponent;
  let fixture: ComponentFixture<ProfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
