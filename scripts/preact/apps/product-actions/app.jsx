import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { formatMoney } from '@scripts/helpers';

function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [adding, setAdding] = useState(false);

  const isSingleVariantProduct = product?.variants?.length === 1;

  const checkOptionDisabled = (option, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = option;

    const updatedOptionsVariant = product.variants.find((variant) =>
      variant.options.every((option) => updatedOptions.includes(option))
    );

    return !(updatedOptionsVariant && updatedOptionsVariant.available);
  };

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = Number(urlParams.get('variant'));
    let urlVariantOptions;

    const defaultOptions = product.options_with_values.map(
      (option) => option.values[0]
    );

    if (urlVariant) {
      const urlVariantObject = product.variants.find(
        (variant) => variant.id === urlVariant
      );
      const { option1, option2, option3 } = urlVariantObject;
      urlVariantOptions = [option1, option2, option3].filter(
        (option) => !!option
      );
    }

    setSelectedOptions(urlVariant ? urlVariantOptions : defaultOptions);
  }, [product]);

  return (
    <div className="c-productActions">
      {product.available ? (
        !isSingleVariantProduct &&
        product.options_with_values.map((option, optionIndex) => (
          <div className="c-productActions__row">
            <div className="c-productActions__option">
              <strong>{option.name}</strong>
              <ul className="c-productActions__values">
                {option.values.map((value) => (
                  <li>
                    <button
                      className={`c-productActions__value
                        ${
                          selectedOptions[optionIndex] === value
                            ? 'c-productActions__value--selected'
                            : ''
                        }
                      `}
                      onClick={() => handleOptionChange(value, optionIndex)}
                      type="button"
                    >
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Sorry, this product is out of stock.</p>
        </div>
      )}
    </div>
  );
}

render(
  <ProductActions product={window.product} />,
  document.querySelector('#app-product-actions')
);
