import { Component, OnInit } from '@angular/core';
import { LyricsPreviewrComponent } from '../views/lyrics-previewr/lyrics-previewr.component';
import { LyricsInsertComponent } from '../views/lyrics-insert/lyrics-insert.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LyricsPreviewrComponent, LyricsInsertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ibprojection';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getMusicFromMemory();
  }
}
