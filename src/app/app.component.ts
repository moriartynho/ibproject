import { Component } from '@angular/core';
import { LyricsPreviewrComponent } from '../views/lyrics-previewr/lyrics-previewr.component';
import { LyricsInsertComponent } from '../views/lyrics-insert/lyrics-insert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LyricsPreviewrComponent, LyricsInsertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ibprojection';
}
