import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUserComponent } from './read-user.component';

describe('UserListComponent', () => {
  let component: ReadUserComponent;
  let fixture: ComponentFixture<ReadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
