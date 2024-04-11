import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment/environment';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface VideoInfo {
  title: string;
  description: string;
  thumbnails: { url: string; width: number; height: number }[];
  formats: any[];
  viewCount: string;
  isPrivate: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public url: string | undefined = undefined;
  public info: VideoInfo | undefined = undefined;

  constructor(private httpClient: HttpClient) {}

  onSubmit() {
    this.httpClient.post<VideoInfo>(environment.serverUrl, { url: this.url }).subscribe((result) => (this.info = result));
  }
}
