import { Window } from "happy-dom";

const window = new Window();

globalThis.window = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLTextAreaElement = window.HTMLTextAreaElement;
globalThis.HTMLButtonElement = window.HTMLButtonElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Event = window.Event;
globalThis.CustomEvent = window.CustomEvent;
globalThis.MouseEvent = window.MouseEvent;
globalThis.KeyboardEvent = window.KeyboardEvent;
globalThis.InputEvent = window.InputEvent;
globalThis.SubmitEvent = window.SubmitEvent;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
