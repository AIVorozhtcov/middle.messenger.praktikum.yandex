import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org/',
})

global.window = jsdom.window;
global.document = jsdom.window.document;
