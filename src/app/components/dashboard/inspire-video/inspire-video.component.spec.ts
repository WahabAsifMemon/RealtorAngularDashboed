import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireVideoComponent } from './inspire-video.component';

describe('InspireVideoComponent', () => {
  let component: InspireVideoComponent;
  let fixture: ComponentFixture<InspireVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspireVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspireVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
