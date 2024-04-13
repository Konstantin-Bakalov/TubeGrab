import { Router } from 'express';
import { requestHandler } from '../error-handler';
import ytdl from 'ytdl-core';
import { PassThrough } from 'stream';

export const downloadRouter = Router();

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

    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    res.header('Content-Type', 'video/mp4');

    ytdl(url, { filter: 'audioandvideo', quality: 'highestvideo' })
      .pipe(res)
      .on('error', () => {
        throw new Error('Could not load video stream');
      });
  }),
);

downloadRouter.get(
  '/audio',
  requestHandler(async (req, res) => {
    const url = req.query.url as string;

    const videoStream = new PassThrough();

    res.header('Content-Disposition', 'attachment; filename="audio.webm"');
    res.header('Content-Type', 'audio/webm');

    ytdl(url, { filter: 'audioonly' })
      .pipe(videoStream)
      .on('error', () => {
        throw new Error('Could not load audio stream');
      });

    videoStream.pipe(res);
  }),
);
