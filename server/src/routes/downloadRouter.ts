import { Router } from 'express';
import { requestHandler } from '../error-handler';
import ytdl from 'ytdl-core';
import { io } from '..';

export const downloadRouter = Router();

interface ProgressData {
  totalDownloaded: number;
  totalSize: number;
}

const downloadEvent = 'download-progress';

const onProgress = (_chunkLen: number, totalDownloaded: number, totalSize: number) => {
  const data: ProgressData = { totalDownloaded, totalSize };
  io.emit(downloadEvent, data);
};

downloadRouter.get(
  '/info',
  requestHandler(async (req, res) => {
    const url = req.query.url as string;
    const urlValid = ytdl.validateURL(url);

    if (!urlValid) {
      throw new Error('Invalid url');
    }

    const { videoDetails } = await ytdl.getInfo(url);

    res.status(200).json({
      viewCount: videoDetails.viewCount,
      thumbnails: videoDetails.thumbnails,
      title: videoDetails.title,
    });
  }),
);

downloadRouter.get(
  '/video',
  requestHandler(async (req, res) => {
    const url = req.query.url as string;

    const stream = ytdl(url, { filter: 'audioandvideo', quality: 'highestvideo' });

    stream.on('progress', onProgress);

    stream.on('error', () => {
      throw new Error('Couldnot load audio stream');
    });

    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    res.header('Content-Type', 'video/mp4');

    stream.pipe(res);
  }),
);

downloadRouter.get(
  '/audio',
  requestHandler(async (req, res) => {
    const url = req.query.url as string;

    const stream = ytdl(url, { filter: 'audioonly' });

    stream.on('progress', onProgress);

    stream.on('error', () => {
      throw new Error('Could not load audio stream');
    });

    res.header('Content-Disposition', 'attachment; filename="audio.webm"');
    res.header('Content-Type', 'audio/webm');

    stream.pipe(res);
  }),
);
