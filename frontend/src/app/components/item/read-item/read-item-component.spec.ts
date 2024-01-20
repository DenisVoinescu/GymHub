import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadItemComponent } from './read-item-component';

describe('ItemComponent', () => {
  let component: ReadItemComponent;
  let fixture: ComponentFixture<ReadItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
