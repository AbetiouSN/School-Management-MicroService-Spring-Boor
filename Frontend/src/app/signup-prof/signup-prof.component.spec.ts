import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupProfComponent } from './signup-prof.component';

describe('SignupProfComponent', () => {
  let component: SignupProfComponent;
  let fixture: ComponentFixture<SignupProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
