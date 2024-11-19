import { Component, inject, ViewChild } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InsertService } from '../../services/insert/insert.service';
import { StoreService } from '../../services/store/store.service';
import { IMusic } from '../../types/music.interface';
import { CommonModule } from '@angular/common';
import { PreviewService } from '../../services/preview/preview.service';
import { ListService } from '../../services/list/list.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-lyrics-insert',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './lyrics-insert.component.html',
  styleUrl: './lyrics-insert.component.scss',
})
export class LyricsInsertComponent {
  private formBuilderService = inject(NonNullableFormBuilder);
  @ViewChild(ModalComponent) modal!: ModalComponent;

  searchInput: string = '';
  musicSearchResults: IMusic[] = [];

  constructor(
    private insertService: InsertService,
    private storeService: StoreService,
    private previewService: PreviewService,
    private listService: ListService
  ) {}

  protected lyricsForm = this.formBuilderService.group({
    musicTitleInput: ['', Validators.required],
    musicLyricsInput: ['', Validators.required],
  });

  searchMusic(): void {
    if (!this.searchInput.trim()) {
      this.musicSearchResults = [];
      return;
    }

    const searchQuery = this.searchInput.toLowerCase();
    this.musicSearchResults = this.storeService
      .getMusics()
      .filter((music) => music.title.toLowerCase().includes(searchQuery));
  }

  doubleClickAction(music: IMusic) {
    this.setMusicToPreview(music);
    this.listService.addMusicToList(music);
  }

  setMusicToPreview(music: IMusic) {
    this.previewService.setMusicToPreview(music);
  }

  saveLyrics(): void {
    if (this.lyricsForm.invalid) {
      console.warn('Invalid form submission');
      return;
    }

    const newMusic: IMusic = {
      title: this.lyricsForm.get('musicTitleInput')?.value.trim() || '',
      lyrics: this.formatLyrics(
        this.lyricsForm.get('musicLyricsInput')?.value || ''
      ),
      isMusicSelected: false,
    };
    this.insertService.insertMusicLyrics(newMusic);
    this.lyricsForm.reset();
    this.modal.toggle();
  }

  private formatLyrics(lyrics: string): string[] {
    return lyrics
      .split(/\n\s*\n/)
      .map((stanza) => stanza.trim())
      .filter((stanza) => stanza.length > 0);
  }
}
