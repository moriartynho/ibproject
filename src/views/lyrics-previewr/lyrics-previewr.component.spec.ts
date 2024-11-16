import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsPreviewrComponent } from './lyrics-previewr.component';

describe('LyricsPreviewrComponent', () => {
  let component: LyricsPreviewrComponent;
  let fixture: ComponentFixture<LyricsPreviewrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LyricsPreviewrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LyricsPreviewrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
