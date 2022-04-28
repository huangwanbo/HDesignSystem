//@ts-nocheck

import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({
    adapter: new Adapter()
});

beforeAll(() => {
    //@ts-ignore
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    global.window = new JSDOM(`...`).window;
    global.document = new JSDOM(`...`).window.document;
    global.requestAnimationFrame = function (callback) {
        return setTimeout(callback, 0);
    };
    global.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})

if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    })
}