import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsInsertComponent } from './lyrics-insert.component';
import { StoreService } from '../../services/store/store.service';
import { IMusic } from '../../types/music.interface';
import { ListService } from '../../services/list/list.service';
import { throwError } from 'rxjs';
import { InsertService } from '../../services/insert/insert.service';

const mockStoreService = {
  getMusics: jest.fn(),
  removeMusic: jest.fn(),
};

const mockListService = {
  addMusicToList: jest.fn(),
};

const mockInsertService = {
  insertMusicLyrics: jest.fn(),
};
describe('LyricsInsertComponent', () => {
  let component: LyricsInsertComponent;
  let fixture: ComponentFixture<LyricsInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: StoreService, useValue: mockStoreService },
        { provide: ListService, useValue: mockListService },
        { provide: InsertService, useValue: mockInsertService },
      ],
      imports: [LyricsInsertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LyricsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#searchMusic', () => {
    const spyGetMusics = jest.spyOn(mockStoreService, 'getMusics');
    it('should not execute getMusics search', () => {
      component.searchInput = '';

      component.searchMusic();

      expect(component.musicSearchResults).toEqual([]);
      expect(spyGetMusics).not.toHaveBeenCalled();
    });

    it('should execute music search', () => {
      const mockedSearchResult: IMusic[] = [
        {
          id: '1',
          title: 'Eu sou de Jesus',
          lyrics: [],
          isSearchMusicSelected: false,
          isListMusicSelected: false,
        },
        {
          id: '2',
          title: 'A Casa é sua',
          lyrics: [],
          isSearchMusicSelected: false,
          isListMusicSelected: false,
        },
        {
          id: '3',
          title: 'Sou casa',
          lyrics: [],
          isSearchMusicSelected: false,
          isListMusicSelected: false,
        },
      ];

      const expectedResult: IMusic[] = [
        {
          id: '1',
          title: 'Eu sou de Jesus',
          lyrics: [],
          isSearchMusicSelected: false,
          isListMusicSelected: false,
        },
        {
          id: '3',
          title: 'Sou casa',
          lyrics: [],
          isSearchMusicSelected: false,
          isListMusicSelected: false,
        },
      ];

      spyGetMusics.mockReturnValue(mockedSearchResult);
      component.searchInput = 'sou';

      component.searchMusic();

      expect(component.musicSearchResults).toEqual(expectedResult);
    });
  });

  describe('#selectMusic', () => {
    it('should set selected music property to null', () => {
      let mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: true,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockedSelectedMusic;

      component.selectMusic(mockedSelectedMusic);

      expect(mockedSelectedMusic.isSearchMusicSelected).toBeFalsy();
      expect(component.selectedMusic).toBeNull();
    });

    it('should set component music selected', () => {
      let mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      component.selectedMusic = {} as IMusic;

      component.selectMusic(mockedSelectedMusic);

      expect(mockedSelectedMusic.isSearchMusicSelected).toBeTruthy();
      expect(component.selectedMusic).toEqual(mockedSelectedMusic);
    });
    it('should toggle selected musics', () => {
      const mockMusic1: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: true,
        isListMusicSelected: false,
      };
      const mockMusic2: IMusic = {
        id: '2',
        title: 'Eu sou Casa',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockMusic1;

      component.selectMusic(mockMusic2);

      expect(mockMusic1.isSearchMusicSelected).toBeFalsy();
      expect(mockMusic2.isSearchMusicSelected).toBeTruthy();
    });
    it('should set selected to false if null', () => {
      const mockMusic1: IMusic = undefined as unknown as IMusic;
      const mockMusic2: IMusic = {
        id: '2',
        title: 'Eu sou Casa',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      component.selectedMusic = mockMusic1;

      component.selectMusic(mockMusic2);

      expect(mockMusic2.isSearchMusicSelected).toBeTruthy();
      expect(component.selectedMusic).toEqual(mockMusic2);
    });
  });

  describe('#addSelectedMusicToList', () => {
    it('should not add selected music to list', () => {
      component.selectedMusic = undefined as unknown as IMusic;
      const spyConsoleWarn = jest.spyOn(window.console, 'warn');

      component.addSelectedMusicToList();

      expect(spyConsoleWarn).toHaveBeenCalled();
    });
    it('should add selected music to list', () => {
      const mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockedSelectedMusic;
      const spyAddToList = jest.spyOn(mockListService, 'addMusicToList');
      const spyConsoleInfo = jest.spyOn(window.console, 'info');

      component.addSelectedMusicToList();

      expect(mockedSelectedMusic.isSearchMusicSelected).toBeFalsy();
      expect(spyAddToList).toHaveBeenCalledWith(mockedSelectedMusic);
      expect(spyConsoleInfo).toHaveBeenCalledWith(
        `Music added to the list: ${mockedSelectedMusic.title}`
      );
      expect(component.selectedMusic).toBeNull();
    });

    it('should catch error', () => {
      const mockedError = new Error();
      const mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockedSelectedMusic;
      const spyAddToList = jest
        .spyOn(mockListService, 'addMusicToList')
        .mockImplementation(() => {
          throw mockedError;
        });
      const spyConsoleError = jest.spyOn(window.console, 'error');

      component.addSelectedMusicToList();

      expect(spyConsoleError).toHaveBeenCalled();
    });
  });

  describe('#editSelectedMusic', () => {
    it('should not edit music to list', () => {
      component.selectedMusic = undefined as unknown as IMusic;
      const spyConsoleWarn = jest.spyOn(window.console, 'warn');

      component.editSelectedMusic();

      expect(spyConsoleWarn).toHaveBeenCalled();
    });

    it('should edit music to list', () => {
      const mockMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      const spyForm = jest.spyOn(component['lyricsForm'], 'setValue');
      const spyModal = jest.spyOn(component['modal'], 'toggle');
      const expectedCallValue = {
        musicTitleInput: mockMusic.title,
        musicLyricsInput: component['unformatLyrics'](mockMusic.lyrics),
      };
      component.selectedMusic = mockMusic;
      component.editSelectedMusic();

      expect(spyForm).toHaveBeenCalledWith(expectedCallValue);
      expect(spyModal).toHaveBeenCalled();
    });
  });

  describe('#doubleClickAction', () => {
    it('should execute double click action', () => {
      const mockMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      jest
        .spyOn(mockListService, 'addMusicToList')
        .mockImplementation(() => {});
      const spyListService = jest.spyOn(mockListService, 'addMusicToList');
      const spyMusicToPreview = jest.spyOn(component, 'setMusicToPreview');

      component.doubleClickAction(mockMusic);

      expect(spyListService).toHaveBeenCalledWith(mockMusic);
      expect(spyMusicToPreview).toHaveBeenCalledWith(mockMusic);
    });
  });

  describe('#saveLyrics', () => {
    it('should not save lyrics', () => {
      component['lyricsForm'].setValue({
        musicLyricsInput: '',
        musicTitleInput: 'undefined',
      });

      const spyConsoleWarn = jest.spyOn(window.console, 'warn');

      component.saveLyrics();

      expect(spyConsoleWarn).toHaveBeenCalled();
    });

    it('should save lyrics', () => {
      component['lyricsForm'].setValue({
        musicLyricsInput: 'Eu sou de Jesus',
        musicTitleInput: 'Meu Deus! Pra esse mundo não volto mais',
      });

      const spyInsertMusic = jest.spyOn(mockInsertService, 'insertMusicLyrics');
      const spyForm = jest.spyOn(component['lyricsForm'], 'reset');
      const spyModal = jest.spyOn(component['modal'], 'toggle');

      component.saveLyrics();

      expect(spyInsertMusic).toHaveBeenCalled();
      expect(spyForm).toHaveBeenCalled();
      expect(spyModal).toHaveBeenCalled();
    });
  });

  describe('#removeSelectedMusic', () => {
    it('should not remove music from list', () => {
      component.selectedMusic = undefined as unknown as IMusic;
      const spyConsoleWarn = jest.spyOn(window.console, 'warn');

      component.removeSelectedMusic();

      expect(spyConsoleWarn).toHaveBeenCalled();
    });
    it('should remove music from list', () => {
      const mockMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockMusic;
      const spyRemoveMusic = jest.spyOn(mockStoreService, 'removeMusic');
      const spySeachMusic = jest.spyOn(component, 'searchMusic');

      component.removeSelectedMusic();

      expect(spyRemoveMusic).toHaveBeenCalledWith(mockMusic);
      expect(spySeachMusic).toHaveBeenCalled();
    });

    it('should catch error', () => {
      const mockedError = new Error();
      const mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };
      component.selectedMusic = mockedSelectedMusic;
      jest.spyOn(mockStoreService, 'removeMusic').mockImplementation(() => {
        throw mockedError;
      });
      const spyConsoleError = jest.spyOn(window.console, 'error');

      component.removeSelectedMusic();

      expect(spyConsoleError).toHaveBeenCalled();
    });
  });
});
