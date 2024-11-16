import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { IMusic } from '../../types/music.interface';

@Component({
  selector: 'app-lyrics-previewr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lyrics-previewr.component.html',
  styleUrl: './lyrics-previewr.component.scss',
})
export class LyricsPreviewrComponent implements OnInit {
  musicToPreview: IMusic;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getMusicFromMemory();
    this.musicToPreview = this.storeService.getMusics()[1];
  }
}
