import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { IMusic } from '../../types/music.interface';

@Injectable({
  providedIn: 'root',
})
export class InsertService {
  constructor(private store: StoreService) {}

  insertMusicLyrics(music: IMusic) {
    this.store.insertOrUpdateMusic(music);
  }
}
