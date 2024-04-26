import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DownloadService, MediaInfo } from '../services/download.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { Subject, takeUntil } from 'rxjs';
import { ProgressData, SocketService } from '../services/socket.service';

const errorMessage = 'Sorry, but the video could not be found.';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorComponent],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public url: string = '';
  public info: MediaInfo | undefined = undefined;
  public loading = false;
  public errorMessage: string | undefined = undefined;
  private destroy$ = new Subject<void>();

  @Output() infoEmitter = new EventEmitter<MediaInfo>();

  constructor(
    private downloadService: DownloadService,
    public socketService: SocketService,
  ) {}

  ngOnInit() {
    this.downloadService.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => (this.loading = loading));
    this.downloadService.error$.pipe(takeUntil(this.destroy$)).subscribe((errorMessage) => (this.errorMessage = errorMessage));
    this.socketService.connect();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  convertToPercentage(progress: ProgressData) {
    return ((progress.totalDownloaded / progress.totalSize) * 100).toFixed(0);
  }
}
