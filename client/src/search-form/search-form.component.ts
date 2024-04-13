import { Component, EventEmitter, Output } from '@angular/core';
import { DownloadService, VideoInfo } from '../services/download.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

const errorMessage =
  'Sorry, we could not find the requested video. Some videos are not available due to restrictions set by the uploader or platform policies';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorComponent],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  public url: string = '';
  public info: VideoInfo | undefined = undefined;
  public loading = false;
  public errorMessage: string | undefined = undefined;

  @Output() infoEmitter = new EventEmitter<VideoInfo>();

  constructor(private downloadService: DownloadService) {}

  ngOnInit() {
    this.downloadService.loading$.subscribe((loading) => (this.loading = loading));
    this.downloadService.error$.subscribe((errorMessage) => (this.errorMessage = errorMessage));
  }

  onSubmit() {
    this.downloadService.getInfo(this.url).subscribe({
      next: (info) => {
        this.info = info;
        this.infoEmitter.emit(info);
        this.downloadService.url = this.url;
        this.downloadService.error$.next(undefined);
      },
      error: () => {
        this.downloadService.loading$.next(false);
        this.downloadService.error$.next(errorMessage);
      },
    });
  }
}
