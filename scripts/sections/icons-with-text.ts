import '@styles/sections/icons-with-text.scss';

class IconsWithText extends HTMLElement {
  constructor() {
    super();
  }
}

if (!customElements.get('icons-with-text')) {
  customElements.define('icons-with-text', IconsWithText);
}
