export const getSectionInnerHTML = (
  html: string,
  selector = '.shopify-section'
) =>
  new DOMParser().parseFromString(html, 'text/html').querySelector(selector)
    ?.innerHTML;

export const handleize = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-$/, '')
    .replace(/^-/, '');
