"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs = __importStar(require("fs"));
const handler = async (event, context) => {
    try {
        const url = new URL(event.rawUrl);
        const min = parseInt(url.searchParams.get('min') || '0', 10);
        const max = parseInt(url.searchParams.get('max') || '99', 10);
        const wordsStr = fs.readFileSync('./words.txt', 'utf-8');
        let wordsArray = wordsStr.split('\n');
        if (min !== 0 || max !== 99) {
            wordsArray = wordsArray.filter(word => {
                word = word.replace('\r', '').trim();
                return word.length >= min && word.length <= max;
            });
        }
        let randomWord = wordsArray[Math.floor(Math.random() * (wordsArray.length))];
        randomWord = randomWord.replace('\r', '').trim();
        return {
            statusCode: 200,
            body: JSON.stringify({ word: randomWord }),
        };
    }
    catch (err) {
        console.error('Error reading file:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was an error generating a word.' }),
        };
    }
};
exports.handler = handler;
