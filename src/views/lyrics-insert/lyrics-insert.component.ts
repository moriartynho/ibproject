import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsertService } from '../../services/insert.service';
import { StoreService } from '../../services/store.service';
import { IMusic } from '../../types/music.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lyrics-insert',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lyrics-insert.component.html',
  styleUrl: './lyrics-insert.component.scss',
})
export class LyricsInsertComponent {
  searchInput: string = '';
  musicSearchResults: IMusic[] = [];

  songLyrics: string = '';
  stanzas: string[] = [];

  constructor(
    private insertService: InsertService,
    private storeService: StoreService
  ) {}

  processLyrics(): void {
    this.stanzas = this.songLyrics
      .split(/\n\s*\n/)
      .map((stanza) => stanza.trim());
    this.insertService.insertMusicLyrics(this.stanzas);
  }

  searchMusic() {
    console.log(this.searchInput);
    if (this.searchInput) {
      this.musicSearchResults = this.storeService
        .getMusics()
        .filter((music) =>
          music.title
            .toLocaleUpperCase()
            .includes(this.searchInput.toLocaleUpperCase())
        );
    } else {
      this.musicSearchResults = [];
    }

    console.log(this.musicSearchResults);
  }
}
