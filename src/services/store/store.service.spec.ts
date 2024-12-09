import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { IMusic } from '../../types/music.interface';
import { CommonConstants } from '../../constants/common-constants';

describe('StoreService', () => {
  let service: StoreService;
  const mockedMusicList: IMusic[] = [
    {
      id: '1',
      title: 'Musica1',
      lyrics: [],
      isSearchMusicSelected: false,
      isListMusicSelected: false,
    },
    {
      id: '2',
      title: 'Musica2',
      lyrics: [],
      isSearchMusicSelected: false,
      isListMusicSelected: false,
    },
  ];

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [StoreService],
    });

    service = TestBed.inject(StoreService);
  });

  beforeEach(() => {
    window.localStorage.getItem = jest
      .fn()
      .mockReturnValue(JSON.stringify(mockedMusicList));
  });

  beforeEach(() => {
    (service as any).musicsOnMemory = mockedMusicList;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getMusicFromMemory', () => {
    it('should load musics from localStorage', () => {
      const spyResetSelect = jest.spyOn(service, 'resetSelect');
      service.getMusicFromMemory();
      expect(service.getMusics()).toEqual(mockedMusicList);
      expect(spyResetSelect).toHaveBeenCalled();
    });

    it('should set music list as empty array', () => {
      window.localStorage.getItem = jest
        .fn()
        .mockReturnValue(JSON.stringify(undefined));
      service.getMusicFromMemory();
      expect(service.getMusics()).toEqual([]);
    });
  });

  describe('#updateMusicOnMemory', () => {
    it('should update music from memory', () => {
      (service as any).musicsOnMemory = mockedMusicList;
      const musicsAsString = JSON.stringify(mockedMusicList);
      service.updateMusicOnMemory();
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        CommonConstants.LOCAL_STORAGE_KEY,
        musicsAsString
      );
    });
  });

  describe('#insertOrUpdateMusic', () => {
    it('should edit existing music', () => {
      const mockedMusic: IMusic = {
        id: '1',
        title: 'Musica1',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      const indexMockedMusic = service.getMusics().indexOf(mockedMusic);
      const spyUpdateMusic = jest.spyOn(service, 'updateMusicOnMemory');

      service.insertOrUpdateMusic(mockedMusic);

      expect(service.getMusics().at(indexMockedMusic - 1)).toEqual(mockedMusic);
      expect(spyUpdateMusic).toHaveBeenCalled();
    });
    it('should insert a new music', () => {
      const mockedMusic: IMusic = {
        id: '',
        title: 'Musica3',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      const spyGenerateUniqueId = jest.spyOn(service, 'generateUniqueId');

      service.insertOrUpdateMusic(mockedMusic);

      expect(spyGenerateUniqueId).toHaveBeenCalled();
      expect(service.getMusics().includes(mockedMusic)).toBeTruthy();
    });
  });

  describe('#removeMusic', () => {
    it('should not remove music if hasMusic equal to false', () => {
      const mockedMusic: IMusic = {
        id: '999',
        title: 'Musica1',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      const spyGetIndex = jest.spyOn(service, 'getIndexOfMusicOnMemoryList');
      const spyUpdateMusic = jest.spyOn(service, 'updateMusicOnMemory');

      service.removeMusic(mockedMusic);

      expect(spyGetIndex).not.toHaveBeenCalled();
      expect(spyUpdateMusic).not.toHaveBeenCalled();
    });

    it('should remove music if hasMusic equal to true', () => {
      const mockedMusic: IMusic = {
        id: '1',
        title: 'Musica1',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      const spyGetIndex = jest.spyOn(service, 'getIndexOfMusicOnMemoryList');
      const spyUpdateMusic = jest.spyOn(service, 'updateMusicOnMemory');

      service.removeMusic(mockedMusic);

      expect(spyGetIndex).toHaveBeenCalled();
      expect(spyUpdateMusic).toHaveBeenCalled();
      expect(service.getMusics().includes(mockedMusic)).toBeFalsy();
    });
  });
});
