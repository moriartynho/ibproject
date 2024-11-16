import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { IMusic } from '../../types/music.interface';

@Injectable({
  providedIn: 'root',
})
export class InsertService {
  constructor(private store: StoreService) {}

  insertMusicLyrics(lyrics: string[]) {
    const music: IMusic = { title: lyrics[0], lyrics: lyrics };
    this.store.insertMusic(music);
  }
}
