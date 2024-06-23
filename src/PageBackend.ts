import { drawGrid } from "./Draw.js";
import assert from "assert";
import { parseFromText } from "./GridADT.js";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');

drawGrid(parseFromText(""),canvas);