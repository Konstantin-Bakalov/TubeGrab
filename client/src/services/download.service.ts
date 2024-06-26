import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, tap } from 'rxjs';

export interface MediaInfo {
  title: string;
  thumbnails: { url: string; width: number; height: number }[];
  viewCount: string;
}

export type MediaType = 'video' | 'audio';

const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

@Injectable({ providedIn: 'root' })
export class DownloadService {
  public loading$ = new BehaviorSubject<boolean>(false);
  public url = '';
  public error$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

  private downloadBlob(url: string, mediaType: MediaType) {
    return this.httpClient.get(`${environment.serverUrl}/${mediaType}?url=${url}`, { responseType: 'blob', headers });
  }

  public downloadMedia(url: string, mediaType: MediaType, title?: string) {
    this.loading$.next(true);
    this.error$.next(undefined);
    return this.downloadBlob(url, mediaType).pipe(
      tap((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${title ?? 'media'}${mediaType === 'video' ? '.mp4' : '.webm'}`;
        document.body.append(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        a.remove();
        this.loading$.next(false);
        this.error$.next(undefined);
      }),
    );
  }

  public getInfo(url: string) {
    this.loading$.next(true);
    return this.httpClient
      .get<MediaInfo>(`${environment.serverUrl}/info?url=${url}`, { headers })
      .pipe(tap(() => this.loading$.next(false)));
  }
}
