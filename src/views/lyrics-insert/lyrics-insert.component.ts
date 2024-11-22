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
  selectedMusic: IMusic;

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

    const searchQuery = this.normalizeText(this.searchInput);
    this.musicSearchResults = this.storeService
      .getMusics()
      .filter((music) => this.normalizeText(music.title).includes(searchQuery));
  }

  normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  selectMusic(music: IMusic): void {
    this.selectedMusic?.isMusicSelected &&
      (this.selectedMusic.isMusicSelected = false);
    this.selectedMusic = this.selectedMusic === music ? ({} as IMusic) : music;
    this.selectedMusic.isMusicSelected = !!Object.keys(this.selectedMusic)
      .length;
  }

  addSelectedMusicToList(): void {
    if (!this.selectedMusic) {
      console.warn('No music selected to add to the list.');
      return;
    }

    try {
      this.selectedMusic.isMusicSelected = false;
      this.listService.addMusicToList(this.selectedMusic);
      console.info(`Music added to the list: ${this.selectedMusic.title}`);
      this.selectedMusic = null;
    } catch (error) {
      console.error('Failed to add music to the list:', error);
    }
  }

  editSelectedMusic() {
    if (!this.selectedMusic) {
      console.warn('No music selected to add or edit to the list.');
      return;
    }
    this.lyricsForm.setValue({
      musicTitleInput: this.selectedMusic.title,
      musicLyricsInput: this.unformatLyrics(this.selectedMusic.lyrics),
    });
    this.modal.toggle();
    this.searchMusic();
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
      console.warn('Formulário inválido. Corrija os erros antes de continuar.');
      return;
    }

    const title = this.lyricsForm.get('musicTitleInput')?.value?.trim() || '';
    const lyrics = this.formatLyrics(
      this.lyricsForm.get('musicLyricsInput')?.value || ''
    );

    const newMusic: IMusic = {
      id: this.selectedMusic?.id,
      title,
      lyrics,
      isMusicSelected: false,
    };

    this.insertService.insertMusicLyrics(newMusic);

    this.lyricsForm.reset();
    this.modal.toggle();
  }

  removeSelectedMusic(): void {
    if (!this.selectedMusic) {
      console.warn('No music selected to remove from the memory list.');
      return;
    }

    try {
      this.storeService.removeMusic(this.selectedMusic);
      this.searchMusic();
    } catch (error) {
      console.error('Failed to remove music from the memory list:', error);
    }
  }

  private formatLyrics(lyrics: string): string[] {
    return lyrics
      .split(/\n\s*\n/)
      .map((stanza) => stanza.trim())
      .filter((stanza) => stanza.length > 0);
  }

  private unformatLyrics(lyricsArray: string[]): string {
    return lyricsArray.join('\n\n');
  }
}
