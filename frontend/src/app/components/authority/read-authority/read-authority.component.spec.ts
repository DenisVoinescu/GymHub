import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAuthorityComponent } from './read-authority.component';

describe('AuthorityListComponent', () => {
  let component: ReadAuthorityComponent;
  let fixture: ComponentFixture<ReadAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadAuthorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
