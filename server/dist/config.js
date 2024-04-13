"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config = {
    port: process.env.SERVER_PORT || 8080,
};
exports.config = config;
