import { Component, Input } from '@angular/core';
import { DownloadService, MediaInfo, MediaType } from '../services/download.service';

const errorMessage = 'Sorry, we could not download the requested file.';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() info!: MediaInfo;

  constructor(private downloadService: DownloadService) {}

  formatViewCount() {
    return new Number(this.info.viewCount).toLocaleString('en-US');
  }

  download(mediaType: MediaType) {
    this.downloadService.downloadMedia(this.downloadService.url, mediaType, this.info.title).subscribe({
      error: () => {
        this.downloadService.loading$.next(false);
        this.downloadService.error$.next(errorMessage);
      },
    });
  }
}
