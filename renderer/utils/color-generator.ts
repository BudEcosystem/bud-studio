export const generateColor = (text) => {
    const md5 = require("blueimp-md5");
    const hash = md5(text);
    const hex = hash.slice(0, 6);
    const decimal = parseInt(hex, 16);
    const r = (decimal >> 16) & 255;
    const g = (decimal >> 8) & 255;
    const b = decimal & 255;
    return `rgb(${r}, ${g}, ${b})`;
}
