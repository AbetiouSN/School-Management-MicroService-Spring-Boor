import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudComponent } from './list-etud.component';

describe('ListEtudComponent', () => {
  let component: ListEtudComponent;
  let fixture: ComponentFixture<ListEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEtudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
