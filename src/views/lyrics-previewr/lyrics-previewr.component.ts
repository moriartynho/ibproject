import { PreviewService } from './../../services/preview.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMusic } from '../../types/music.interface';

@Component({
  selector: 'app-lyrics-previewr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lyrics-previewr.component.html',
  styleUrl: './lyrics-previewr.component.scss',
})
export class LyricsPreviewrComponent {
  constructor(public previewService: PreviewService) {}
}
