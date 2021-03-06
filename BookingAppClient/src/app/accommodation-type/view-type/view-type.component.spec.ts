import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTypeComponent } from './view-type.component';

describe('ViewTypeComponent', () => {
  let component: ViewTypeComponent;
  let fixture: ComponentFixture<ViewTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
