import type React from 'react';

type ToastMarkdownRenderer = (message: string) => React.ReactNode;

let markdownRenderer: ToastMarkdownRenderer | undefined;

/**
 * Register a renderer used to display markdown toasts. Host apps register
 * their markdown component once at startup; toasts sent with markdown=true
 * are rendered through it. Without a renderer, markdown toasts fall back to
 * plain text.
 */
const setToastMarkdownRenderer = (renderer: ToastMarkdownRenderer) => {
  markdownRenderer = renderer;
};

const renderToastMessage = (
  message: string,
  markdown?: boolean
): string | React.ReactNode =>
  markdown && markdownRenderer ? markdownRenderer(message) : message;

export { renderToastMessage, setToastMarkdownRenderer };
