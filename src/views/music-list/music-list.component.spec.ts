import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListComponent } from './music-list.component';
import { PreviewService } from '../../services/preview/preview.service';
import { IMusic } from '../../types/music.interface';
import { ListService } from '../../services/list/list.service';

const mockPreviewService = {
  setMusicToPreview: jest.fn(),
};

const mockListService = {
  removeMusicFromList: jest.fn(),
  getMusicList: jest.fn(),
};

describe('MusicListComponent', () => {
  let component: MusicListComponent;
  let fixture: ComponentFixture<MusicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: PreviewService, useValue: mockPreviewService },
        { provide: ListService, useValue: mockListService },
      ],
      imports: [MusicListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      const spySetMusicToPreview = jest.spyOn(
        mockPreviewService,
        'setMusicToPreview'
      );

      component.doubleClickAction(mockMusic);

      expect(spySetMusicToPreview).toHaveBeenCalled();
    });
  });

  describe('#selectMusic', () => {
    it('should set component music selected', () => {
      let mockedSelectedMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      component.musicSelected = {} as IMusic;

      component.selectMusic(mockedSelectedMusic);

      expect(mockedSelectedMusic.isListMusicSelected).toBeTruthy();
      expect(component.musicSelected).toEqual(mockedSelectedMusic);
    });
  });

  describe('#deleteSelectedMusic', () => {
    const mockGetMusics: IMusic[] = [];

    jest.spyOn(mockListService, 'getMusicList').mockReturnValue(mockGetMusics);

    it('should not execute removeMusicList', () => {
      const spyRemoveMusic = jest.spyOn(mockListService, 'removeMusicFromList');
      component.musicSelected = undefined as unknown as IMusic;

      component.deleteSelectedMusic();

      expect(spyRemoveMusic).not.toHaveBeenCalled();
    });

    it('should execute removeMusicList', () => {
      const spyRemoveMusic = jest.spyOn(mockListService, 'removeMusicFromList');
      const mockMusic: IMusic = {
        id: '1',
        title: 'Eu sou de Jesus',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: true,
      };
      component.musicSelected = mockMusic;

      component.deleteSelectedMusic();

      expect(spyRemoveMusic).toHaveBeenCalledWith(mockMusic);
    });
  });
  describe('#handleKeyDown', () => {
    it('should execute deleteSelectedMusic when Delete keydown', () => {
      const mockedKeyDownEvent: KeyboardEvent = {
        key: 'Delete',
      } as KeyboardEvent;
      const spyDeleteMusic = jest.spyOn(component, 'deleteSelectedMusic');

      component.handleKeyDown(mockedKeyDownEvent);

      expect(spyDeleteMusic).toHaveBeenCalled();
    });
  });
});
