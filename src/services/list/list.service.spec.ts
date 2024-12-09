import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { IMusic } from '../../types/music.interface';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addMusicToList', () => {
    it('should insert music at musicList', () => {
      const mockedMusic: IMusic = {
        id: '',
        title: '',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      service.addMusicToList(mockedMusic);

      expect(service.getMusicList()).toEqual([mockedMusic]);
    });
  });

  describe('#removeMusicFromList', () => {
    it('should remove music from musicList', () => {
      const mockedMusic: IMusic = {
        id: '',
        title: '',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      service.addMusicToList(mockedMusic);

      service.removeMusicFromList(mockedMusic);

      expect(service.getMusicList()).toEqual([]);
    });
  });
});
