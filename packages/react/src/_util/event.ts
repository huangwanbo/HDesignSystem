export const on = (element: Element, event: string, handler: (ev: any) => any, options?: boolean | AddEventListenerOptions): void => {
    element && element.addEventListener(event, handler, options || false);
}

export const off = (element: Element, event: string, handler: (ev: any) => any, options?: boolean | AddEventListenerOptions): void => {
    element && element.removeEventListener(event, handler, options || false);
}