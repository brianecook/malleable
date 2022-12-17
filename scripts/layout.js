import axios from 'axios';
import '@styles/layout.scss';

async function getData(path) {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const cartData = await getData('/cart.js');
  console.log(cartData);
  console.log('yooop!');
})();

const elva = {
  select(selector) {
    return document.querySelectorAll(selector);
  },
  listen(selector, event, callback) {
    this.select(selector).forEach(($el) => {
      $el.addEventListener(event, callback);
    });
  },
};

window.elva = elva;
