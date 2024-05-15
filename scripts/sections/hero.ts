import '@styles/sections/hero.scss';

class Hero extends HTMLElement {
  constructor() {
    super();
  }
}

if (!customElements.get('main-hero')) {
  customElements.define('main-hero', Hero);
}
