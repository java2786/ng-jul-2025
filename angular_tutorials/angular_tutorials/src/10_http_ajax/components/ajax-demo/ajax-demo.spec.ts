import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjaxDemo } from './ajax-demo';

describe('AjaxDemo', () => {
  let component: AjaxDemo;
  let fixture: ComponentFixture<AjaxDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjaxDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjaxDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
