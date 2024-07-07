import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org/',
})

global.window = jsdom.window;
global.document = jsdom.window.document;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.scroll = (number1, number2) => {};
global.MouseEvent = jsdom.window.MouseEvent;
