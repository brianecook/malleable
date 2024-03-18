import select from 'selectricity';

export default class ProductOptions extends HTMLElement {
  constructor() {
    super();
    this.options = select('[data-option]', this);

    this.options.listen('click', ($option) => this.handleOptionClick($option));
  }

  handleOptionClick($option) {
    select('[data-option]', $option.closest('[data-options]')).attribute(
      'remove',
      'data-selected'
    );
    $option.attribute('set', 'data-selected');

    this.getVariant(this);
  }

  getVariant($container) {
    const values = [];

    $container.querySelectorAll('[data-selected]').forEach(($option) => {
      values.push($option.getAttribute('data-option'));
    });

    const $selectedOption = $container.querySelector(
      `[data-options="${values.join(',')}"]`
    );

    $container.querySelector('[data-variant-select]').selectedIndex =
      $selectedOption.index;
    $container
      .querySelector('[data-add-to-cart]')
      .setAttribute('data-id', $selectedOption.textContent.trim());
  }
}

customElements.define('product-options', ProductOptions);
