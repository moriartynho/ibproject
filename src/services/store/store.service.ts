import { Injectable } from '@angular/core';
import { IMusic } from '../../types/music.interface';
import { CommonConstants } from '../../constants/common-constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  musicsOnMemory: IMusic[] = [];

  constructor() {}

  getMusicFromMemory() {
    const musicsAsString = localStorage.getItem(
      CommonConstants.LOCAL_STORAGE_KEY
    );
    this.musicsOnMemory = musicsAsString ? JSON.parse(musicsAsString) : [];
  }

  updateMusicOnMemory() {
    const musicsAsString = JSON.stringify(this.musicsOnMemory);
    localStorage.setItem(CommonConstants.LOCAL_STORAGE_KEY, musicsAsString);
  }

  getMusics(): IMusic[] {
    return this.musicsOnMemory;
  }

  insertMusic(music: IMusic) {
    this.musicsOnMemory.push(music);
    this.updateMusicOnMemory();
  }
}
