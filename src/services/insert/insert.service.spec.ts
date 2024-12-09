import { TestBed } from '@angular/core/testing';

import { InsertService } from './insert.service';
import { IMusic } from '../../types/music.interface';
import { StoreService } from '../store/store.service';

describe('InsertService', () => {
  let service: InsertService;

  const mockStoreService = {
    insertOrUpdateMusic: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InsertService,
        { provide: StoreService, useValue: mockStoreService },
      ],
    });
    service = TestBed.inject(InsertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#insertMusicLyrics', () => {
    it('should call insertOrUpdateMusic on insertMusicLyrics', () => {
      const spyInsertOrUpdateMusic = jest.spyOn(
        mockStoreService,
        'insertOrUpdateMusic'
      );

      const mockedMusic: IMusic = {
        id: 'mockedId',
        title: 'Eu sou de Jesus - Lázaro',
        lyrics: ['', '', ''],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      service.insertMusicLyrics(mockedMusic);

      expect(spyInsertOrUpdateMusic).toHaveBeenCalledWith(mockedMusic);
    });
  });
});
