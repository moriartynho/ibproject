import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreService } from '../services/store/store.service';

const mockStoreService = {
  getMusicFromMemory: jest.fn(),
};
describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: StoreService, useValue: mockStoreService }],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const spyGetMusicFromMemory = jest.spyOn(
      mockStoreService,
      'getMusicFromMemory'
    );
    expect(component).toBeTruthy();
    expect(spyGetMusicFromMemory).toHaveBeenCalled();
  });
});
