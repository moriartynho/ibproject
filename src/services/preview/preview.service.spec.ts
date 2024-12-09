import { TestBed } from '@angular/core/testing';

import { PreviewService } from './preview.service';
import { IMusic } from '../../types/music.interface';

describe('PreviewService', () => {
  let service: PreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setMusicToPreview', () => {
    it('should set music to preview', () => {
      const mockedMusic: IMusic = {
        id: '',
        title: '',
        lyrics: [],
        isSearchMusicSelected: false,
        isListMusicSelected: false,
      };

      service.setMusicToPreview(mockedMusic);

      expect(service['musicToPreview']).toEqual(mockedMusic);
    });
  });
});
