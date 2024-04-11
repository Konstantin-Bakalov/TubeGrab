import { Router } from 'express';
import { requestHandler } from '../error-handler';
import { z } from 'zod';
import ytdl from 'ytdl-core';

const downloadRouter = Router();

downloadRouter.post(
  '/',
  requestHandler(async (req, res) => {
    const url = z.string().url().parse(req.body.url);

    const urlValid = ytdl.validateURL(req.body.url);

    const { player_response, videoDetails } = await ytdl.getInfo(url);
    res.status(200).json({
      viewCount: player_response.videoDetails.viewCount,
      isPrivate: player_response.videoDetails.isPrivate,
      thumbnails: videoDetails.thumbnails,
      title: videoDetails.title,
      description: videoDetails.description,
      formats: player_response.streamingData.formats,
    });
  }),
);

export { downloadRouter };
