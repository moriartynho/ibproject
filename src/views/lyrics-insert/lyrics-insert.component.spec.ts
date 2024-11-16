import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsInsertComponent } from './lyrics-insert.component';

describe('LyricsInsertComponent', () => {
  let component: LyricsInsertComponent;
  let fixture: ComponentFixture<LyricsInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyricsInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
