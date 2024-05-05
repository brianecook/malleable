import '@styles/sections/hero.scss';

class Hero extends HTMLElement {
  constructor() {
    super();

    console.log('here is the hero component!');
  }
}

if (!customElements.get('main-hero')) {
  customElements.define('main-hero', Hero);
}
