import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxTestComponent } from './inbox-test.component';

describe('InboxTestComponent', () => {
  let component: InboxTestComponent;
  let fixture: ComponentFixture<InboxTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
