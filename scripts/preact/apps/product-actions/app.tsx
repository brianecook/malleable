import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Quantity from '../../components/Quantity';
import Btn from '../../components/Btn';
import Swatch from '../../components/Swatch';
import { Product, Variant } from '../../types';
import { handleize } from '../../../helpers';

type Props = {
  product: Product;
  handleProductAddedToCart?: () => void | null;
};

const { classes, addToCart, formatMoney } = window.helpers;

export default function ProductActions({
  product,
  handleProductAddedToCart,
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[] | null>([]);
  const [adding, setAdding] = useState<boolean>(false);

  const isSingleVariantProduct = product?.variants?.length === 1;

  const selectedVariant: Variant | null =
    product?.variants?.find((variant) => {
      const { option1, option2, option3 } = variant;
      const variantOptions = [option1, option2, option3].filter(
        (option) => option
      );
      return selectedOptions?.every((option: string) =>
        variantOptions.includes(option)
      );
    }) || null;

  const checkOptionDisabled = (option: string, index: number) => {
    const updatedOptions = [...(selectedOptions || [])] as string[];
    updatedOptions[index] = option;

    const updatedOptionsVariant = product.variants.find((variant) =>
      variant.options.every((variantOption) =>
        updatedOptions.includes(variantOption)
      )
    );

    return !(updatedOptionsVariant && updatedOptionsVariant.available);
  };

  const handleOptionChange = (value: string, index: number) => {
    const updatedOptions = [...(selectedOptions || [])] as string[];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleAddToCart = async () => {
    const variantToAdd: Variant | null = isSingleVariantProduct
      ? product.variants[0]
      : selectedVariant;

    if (variantToAdd) {
      setAdding(true);
      await addToCart(variantToAdd.id, quantity);
      setAdding(false);
      if (handleProductAddedToCart) {
        handleProductAddedToCart();
      }
    }
  };

  const getSwatchAsset = (value: string) => {
    const valueHandle = handleize(value);
    const { shop } = window.Shopify;
    return `https://${shop}/cdn/shop/files/${valueHandle}.png`;
  };

  const selectedVariantPrice = formatMoney(selectedVariant?.price || 0);
  const selectedOptionsText =
    selectedOptions && !isSingleVariantProduct ? selectedOptions.join('/') : '';

  const selectionText = isSingleVariantProduct
    ? selectedVariantPrice
    : `${selectedOptionsText} - ${selectedVariantPrice}`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = Number(urlParams.get('variant'));
    const urlVariantObject = product.variants.filter(
      (variant) => variant.id === urlVariant
    )[0];
    let options: string[] | null =
      product.variants.find((variant) => variant.available)?.options || null;

    if (urlVariant && urlVariantObject.available) {
      options = urlVariantObject.options;
    }

    setSelectedOptions(options);
  }, []);

  useEffect(() => {
    if (product.variants.length > 1 && window.product && selectedVariant) {
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?variant=${selectedVariant.id}`
      );
    }
  }, [selectedVariant]);

  return (
    <div>
      <div className="c-productActions">
        {product.available && selectedOptions ? (
          <>
            {!isSingleVariantProduct &&
              product.options_with_values.map((option, optionIndex) => (
                <div className="c-productActions__row">
                  <div className="c-productActions__option">
                    <strong>{option.name}</strong>
                    {option.name !== 'Color' && option.name !== 'Pattern' ? (
                      <ul className="c-productActions__values">
                        {option.values.map((value) => (
                          <li>
                            <button
                              {...classes('c-productActions__value', {
                                'c-productActions__value--selected':
                                  selectedOptions[optionIndex] === value,
                              })}
                              disabled={checkOptionDisabled(value, optionIndex)}
                              onClick={() =>
                                handleOptionChange(value, optionIndex)
                              }
                              type="button"
                            >
                              {value}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="c-swatches">
                        {option.values.map((value) => (
                          <li>
                            <Swatch
                              selected={selectedOptions[optionIndex] === value}
                              disabled={checkOptionDisabled(value, optionIndex)}
                              handleClick={() =>
                                handleOptionChange(value, optionIndex)
                              }
                              label={value}
                              backgroundUrl={getSwatchAsset(value)}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            <div className="c-productActions__row">{selectionText}</div>
            <div className="c-productActions__atc">
              <Quantity
                quantity={quantity}
                handleIncrement={() => setQuantity(quantity + 1)}
                handleDecrement={() =>
                  quantity > 1 && setQuantity(quantity - 1)
                }
              />
              <Btn adding={adding} handleClick={handleAddToCart}>
                Add to Cart
              </Btn>
            </div>
          </>
        ) : (
          <div>
            <button className="c-btn" type="button" disabled>
              Out of Stock
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const $productActions = document.querySelector('#app-product-actions');

if ($productActions) {
  render(<ProductActions product={window.product} />, $productActions);
}
