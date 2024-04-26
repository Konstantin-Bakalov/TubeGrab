import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

export interface ProgressData {
  totalDownloaded: number;
  totalSize: number;
}

const downloadEvent = 'download-progress';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  private progressData: Observable<ProgressData>;

  constructor() {
    this.socket = io(environment.serverUrl);
    this.progressData = new Observable<ProgressData>((subscriber) => {
      this.socket.on(downloadEvent, (data: ProgressData) => {
        subscriber.next(data);
      });
    });
  }

  public connect() {
    this.socket.connect();
  }

  public getProgressData() {
    return this.progressData;
  }
}
