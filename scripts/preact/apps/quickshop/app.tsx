import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import { EventProduct, Product } from '../../types';
import ProductActions from '../product-actions/app';
import useModal from '../../hooks/useModal';

function Quickshop() {
  const { open, setOpen } = useModal();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.addEventListener('quickshopOpened', ((
      e: CustomEvent<{ product: EventProduct }>
    ) => {
      const eventProduct: EventProduct = e.detail.product;
      const { details, options_with_values } = eventProduct; //eslint-disable-line
      setProduct({
        ...details,
        options_with_values, //eslint-disable-line
      });
      setOpen(true);
    }) as EventListener);
  }, []);

  if (!open || !product) {
    return null;
  }

  const featuredImage = product.media[0];

  return (
    <>
      <button
        className="c-overlay"
        onClick={() => setOpen(false)}
        aria-label="Close quickshop"
        type="button"
      />
      <div className="c-quickshop">
        <button
          className="c-btnIcon c-quickshop__close"
          onClick={() => setOpen(false)}
          type="button"
        >
          <MdClose size="1.6em" />
        </button>
        <div className="c-quickshop__inner">
          <div className="c-quickshop__image u-noLineHeight">
            <a href={`/products/${product.handle}`}>
              <img
                className="u-full"
                src={featuredImage.src}
                width={featuredImage.width}
                height={featuredImage.height}
                alt={featuredImage.alt || product.title}
              />
            </a>
          </div>
          <div className="c-quickshop__details">
            <h2>{product.title}</h2>
            <div
              className="c-quickshop__description rte"
              dangerouslySetInnerHTML={{
                __html: product.description || '',
              }}
            />
            <ProductActions
              product={product}
              handleProductAddedToCart={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const $quickshop = document.querySelector('#app-quickshop');

if ($quickshop) {
  render(<Quickshop />, $quickshop);
}
