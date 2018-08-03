import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTramComponent } from './control-tram.component';

describe('ControlTramComponent', () => {
  let component: ControlTramComponent;
  let fixture: ComponentFixture<ControlTramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlTramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
