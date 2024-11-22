import { IMusic } from './../../types/music.interface';
import { Component, HostListener } from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { CommonModule } from '@angular/common';
import { PreviewService } from '../../services/preview/preview.service';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss',
})
export class MusicListComponent {
  musicSelected: IMusic = {} as IMusic;


  constructor(
    private listService: ListService,
    private previewService: PreviewService
  ) {}

  getMusicList(): IMusic[] {
    return this.listService.getMusicList();
  }

  doubleClickAction(music: IMusic): void {
    this.previewService.setMusicToPreview(music);
  }

  selectMusic(music: IMusic): void {
    if (this.musicSelected) {
      this.musicSelected.isListMusicSelected = false;
    }
    music.isListMusicSelected = true;
    this.musicSelected = music;
  }

  deleteSelectedMusic(): void {
    if (!this.musicSelected || !this.musicSelected.isListMusicSelected) {
      return;
    }
    this.listService.removeMusicFromList(this.musicSelected);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.deleteSelectedMusic();
    }
  }
}
