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
    this.resetSelect();
  }

  updateMusicOnMemory() {
    const musicsAsString = JSON.stringify(this.musicsOnMemory);
    localStorage.setItem(CommonConstants.LOCAL_STORAGE_KEY, musicsAsString);
  }

  resetSelect(): void {
    this.musicsOnMemory.forEach((music) => (music.isMusicSelected = false));
  }

  getMusics(): IMusic[] {
    return this.musicsOnMemory;
  }

  insertOrUpdateMusic(music: IMusic): void {
    const existingMusicIndex = this.musicsOnMemory.findIndex(
      (m) => m.id === music.id
    );

    if (existingMusicIndex !== -1) {
      this.musicsOnMemory[existingMusicIndex] = {
        ...this.musicsOnMemory[existingMusicIndex],
        ...music,
      };
    } else {
      music.id = music.id || this.generateUniqueId();
      this.musicsOnMemory.push(music);
    }

    this.updateMusicOnMemory();
  }

  removeMusic(music: IMusic): void {
    if (!this.hasMusic(music)) return;
    const indexMusic = this.getIndexOfMusicOnMemoryList(music);
    this.musicsOnMemory.splice(indexMusic);
    this.updateMusicOnMemory();
  }

  getIndexOfMusicOnMemoryList(music: IMusic): number {
    return this.musicsOnMemory.findIndex((m) => m.id === music.id);
  }

  generateUniqueId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    );
  }

  hasMusic(music: IMusic): boolean {
    return this.musicsOnMemory.some(
      (musicOnList) => musicOnList.id === music.id
    );
  }
}
