import { Component, Input } from '@angular/core';
import { DownloadService, MediaType, VideoInfo } from '../services/download.service';

const errorMessage = 'Sorry, we could not download the requested file. Currently the maximum file size cannot exceed 4.5 Mb';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() info!: VideoInfo;

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
