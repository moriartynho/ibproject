import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewService } from '../../services/preview/preview.service';

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
