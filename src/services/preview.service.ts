import { Injectable } from '@angular/core';
import { IMusic } from '../types/music.interface';

@Injectable({
  providedIn: 'root',
})
export class PreviewService {
  musicToPreview: IMusic = {} as IMusic;

  constructor() {}

  setMusicToPreview(music: IMusic) {
    this.musicToPreview = music;
    console.log(this.musicToPreview);
  }

  getMusicToPreview(): IMusic {
    return this.musicToPreview;
  }
}
