import axios from 'axios';
import '@styles/layout.scss';

async function getData(path) {
  try {
    const { data } = await axios.get(path);
    return data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const cartData = await getData('/cart.js');
  const quickshopData = await getData(
    '/products/antique-drawers?view=quickshop'
  );
  console.log(cartData);
  console.log(quickshopData);
})();
