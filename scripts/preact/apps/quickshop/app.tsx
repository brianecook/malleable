import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import ProductActions from '../product-actions/app';
import useModal from '../../hooks/useModal';

function Quickshop() {
  const { open, setOpen } = useModal();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    document.addEventListener('quickshopOpened', ((
      e: CustomEvent<{ product: Product }>
    ) => {
      setProduct(e.detail.product);
      setOpen(true);
    }) as EventListener);
  }, []);

  if (!open || !product) {
    return null;
  }

  const featuredImage = product.images.nodes[0];

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
          aria-label="Close quickshop"
        >
          <MdClose size="1.6em" />
        </button>
        <div className="c-quickshop__inner">
          <div className="c-quickshop__image u-noLineHeight">
            <a href={`/products/${product.handle}`}>
              <img
                className="u-full"
                src={featuredImage.url}
                width={featuredImage.width || ''}
                height={featuredImage.height || ''}
                alt={featuredImage.altText || product.title}
              />
            </a>
          </div>
          <div className="c-quickshop__details">
            <h2>{product.title}</h2>
            <div
              className="c-quickshop__description rte"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml || '',
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
