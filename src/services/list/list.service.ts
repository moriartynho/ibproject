import { Injectable } from '@angular/core';
import { IMusic } from '../../types/music.interface';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private musicList: IMusic[] = [];

  constructor() {}

  getMusicList(): IMusic[] {
    return this.musicList;
  }

  addMusicToList(music: IMusic): void {
    this.musicList.push(music);
  }

  removeMusicFromList(music: IMusic): void {
    const index = this.musicList.indexOf(music);
    this.musicList.splice(index, 1);
  }
}
