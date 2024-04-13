"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadRouter = void 0;
const express_1 = require("express");
const error_handler_1 = require("../error-handler");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const stream_1 = require("stream");
exports.downloadRouter = (0, express_1.Router)();
exports.downloadRouter.get('/info', (0, error_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    const urlValid = ytdl_core_1.default.validateURL(url);
    if (!urlValid) {
        throw new Error('Invalid url');
    }
    const { videoDetails } = yield ytdl_core_1.default.getInfo(url);
    res.status(200).json({
        viewCount: videoDetails.viewCount,
        thumbnails: videoDetails.thumbnails,
        title: videoDetails.title,
    });
})));
exports.downloadRouter.get('/video', (0, error_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    res.header('Content-Type', 'video/mp4');
    (0, ytdl_core_1.default)(url, { filter: 'audioandvideo', quality: 'highestvideo' })
        .pipe(res)
        .on('error', () => {
        throw new Error('Could not load video stream');
    });
})));
exports.downloadRouter.get('/audio', (0, error_handler_1.requestHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    const videoStream = new stream_1.PassThrough();
    // res.header('Content-Disposition', 'attachment; filename="audio.webm"');
    // res.header('Content-Type', 'audio/webm');
    (0, ytdl_core_1.default)(url, { filter: 'audioonly' })
        .pipe(videoStream)
        .on('error', () => {
        throw new Error('Could not load audio stream');
    });
    videoStream.pipe(res);
})));
