"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// need to disable this rule so that express recognises this signature
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, _next) => {
    if (err instanceof Error) {
        res.status(400).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: 'Internal server error' });
};
exports.errorHandler = errorHandler;
