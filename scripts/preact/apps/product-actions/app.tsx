import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import Quantity from '../../components/Quantity';
import Btn from '../../components/Btn';
import Swatch from '../../components/Swatch';
import { handleize } from '../../../helpers/shopify';
import { quickshopQuery } from '../../../graphql/queries';
import { formatDollars } from '../../../helpers';

type Props = {
  product: Product | undefined;
  handleProductAddedToCart?: () => void;
  updateVariantUrl?: boolean;
};

const { classes, addToCart } = window.helpers;

export default function ProductActions({
  product,
  handleProductAddedToCart,
  updateVariantUrl = false,
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<string[] | null>([]);
  const [adding, setAdding] = useState<boolean>(false);

  const isSingleVariantProduct = product?.variants.nodes?.length === 1;

  const selectedVariant: ProductVariant | null =
    product?.variants.nodes.find((variant) => {
      const options = variant.selectedOptions
        .map((variantOption) => variantOption.value)
        .filter((option) => option);
      return selectedOptions?.every((option: string) =>
        options.includes(option)
      );
    }) || null;

  const selectedVariantId =
    selectedVariant?.id.split('gid://shopify/ProductVariant/')[1] || null;

  const checkOptionDisabled = (option: string, index: number) => {
    const updatedOptions = [...(selectedOptions || [])] as string[];
    updatedOptions[index] = option;

    const updatedOptionsVariant = product?.variants.nodes.find((variant) =>
      variant.selectedOptions.every((variantOption) =>
        updatedOptions.includes(variantOption.value)
      )
    );

    return !(updatedOptionsVariant && updatedOptionsVariant.availableForSale);
  };

  const handleOptionChange = (value: string, index: number) => {
    const updatedOptions = [...(selectedOptions || [])] as string[];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };

  const handleAddToCart = async () => {
    const variantToAdd: ProductVariant | null = isSingleVariantProduct
      ? product?.variants.nodes[0]
      : selectedVariant;

    if (variantToAdd) {
      const id = variantToAdd.id.split('gid://shopify/ProductVariant/')[1];
      setAdding(true);
      await addToCart(id, quantity);
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant');
    const urlVariantObject = product?.variants.nodes.filter((variant) => {
      const id = variant.id.split('gid://shopify/ProductVariant/')[1];
      return id === urlVariant;
    })[0];
    let options: string[] | null =
      product?.variants.nodes
        .find((variant) => variant.availableForSale)
        ?.selectedOptions.map((option) => option.value) || null;

    if (urlVariant && urlVariantObject?.availableForSale) {
      options = urlVariantObject?.selectedOptions.map((option) => option.value);
    }

    setSelectedOptions(options);
  }, []);

  useEffect(() => {
    if (
      product?.variants?.nodes?.length &&
      selectedVariantId &&
      updateVariantUrl
    ) {
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?variant=${selectedVariantId}`
      );
    }
  }, [selectedVariantId]);

  if (!product) return null;

  return (
    <div>
      <div className="c-productActions">
        {product.availableForSale && selectedOptions ? (
          <>
            {!isSingleVariantProduct &&
              product.options.map((option, optionIndex) => (
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
            {selectedVariant && (
              <div className="c-productActions__row">
                {isSingleVariantProduct
                  ? formatDollars(selectedVariant.price.amount)
                  : `${selectedOptions.join('/')} - ${formatDollars(
                      selectedVariant.price.amount
                    )}`}
                {selectedVariant.compareAtPrice && (
                  <>
                    &nbsp;
                    <s>
                      {formatDollars(selectedVariant.compareAtPrice.amount)}
                    </s>
                  </>
                )}
              </div>
            )}
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
  (async () => {
    const productHandle = window.location.pathname.replace('/products/', '');
    const { data } = (await window.client.request(quickshopQuery, {
      variables: {
        handle: productHandle,
      },
    })) as { data: { product: Product }; errors: any };

    render(
      <ProductActions product={data.product} updateVariantUrl />,
      $productActions
    );
  })();
}
