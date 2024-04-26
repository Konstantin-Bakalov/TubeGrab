import { Component, OnInit } from '@angular/core';
import { DownloadService, MediaInfo } from '../services/download.service';
import { CardComponent } from '../card/card.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, SearchFormComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public info: MediaInfo | undefined = undefined;
  public loading = false;

  constructor(private downloadservice: DownloadService) {}

  ngOnInit(): void {
    this.downloadservice.loading$.subscribe((loading) => (this.loading = loading));
  }

  onInfoEmit(info: MediaInfo) {
    this.info = info;
  }
}
