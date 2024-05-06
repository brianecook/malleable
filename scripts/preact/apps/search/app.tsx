import { h, render } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import { SearchResults } from '../../types';
import { getData } from '../../../helpers';
import useModal from '../../hooks/useModal';

function Search() {
  const { open, setOpen, openListener } = useModal();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResults | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    openListener('searchToggled');
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      const response = (await getData(
        `/search/suggest.json?q=${query}`
      )) as SearchResults;
      setResults(response);
    };
    if (query.length > 1) {
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
            {results?.resources?.results?.products?.length ? (
              <div className="c-header__products">
                {results?.resources?.results?.products?.map((product) => (
                  <div className="c-header__result">
                    <a className="c-header__product" href={product.url}>
                      <img
                        src={product.featured_image.url}
                        alt={product.featured_image.alt}
                        width={product.featured_image.width}
                        height={product.featured_image.height}
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
