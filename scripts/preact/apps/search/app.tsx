import { h, render } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import { PredictiveSearchResult } from '@shopify/hydrogen-react/storefront-api-types';
import useModal from '../../hooks/useModal';
import { searchQuery } from '../../../graphql/queries';

function Search() {
  const { open, setOpen, openListener } = useModal();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<PredictiveSearchResult | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    openListener('searchToggled');
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const {
        data: { predictiveSearch },
      } = (await window.client.request(searchQuery, {
        variables: {
          query,
        },
      })) as { data: { predictiveSearch: PredictiveSearchResult } };
      setResults(predictiveSearch);
    };
    if (query.length > 2) {
      fetchResults();
    } else {
      setResults(null);
    }
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  if (!open) return null;

  return (
    <>
      <button
        className="c-header__overlay c-overlay"
        onClick={() => setOpen(false)}
        type="button"
        aria-label="Close search"
      />
      <div className="c-search">
        <div className="u-relative">
          <input
            className="c-input c-search__input"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.keyCode === 27) {
                setOpen(false);
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            placeholder="Search"
          />
          {query.length > 0 && (
            <button
              className="c-search__clear u-noLineHeight"
              type="button"
              aria-label="Clear search"
              onClick={handleClearSearch}
            >
              <MdClose size="1em" />
            </button>
          )}
        </div>
        <button
          className="c-search__close u-noLineHeight"
          type="button"
          aria-label="Close search"
          onClick={() => setOpen(false)}
        >
          <MdClose size="1.6em" />
        </button>
      </div>
      {query.length > 2 && (
        <div className="c-header__results">
          <div className="o-container">
            {results?.products?.length ? (
              <div className="c-header__products">
                {results?.products?.map((product) => (
                  <div className="c-header__result">
                    <a
                      className="c-header__product"
                      href={`/products/${product.handle || ''}`}
                    >
                      <img
                        src={product.featuredImage?.url || ''}
                        alt={product.featuredImage?.altText || ''}
                        width={product.featuredImage?.width || ''}
                        height={product.featuredImage?.height || ''}
                      />
                      <strong>{product.title}</strong>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p>No search results.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const $search = document.querySelector('#app-search');

if ($search) {
  render(<Search />, $search);
}
