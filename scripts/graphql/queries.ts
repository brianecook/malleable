export const quickshopQuery = `
  query QuickshopQuery($handle: String) {
    product(handle: $handle) {
      id
      availableForSale
      title
      handle
      descriptionHtml
      variants(first: 99) {
        nodes {
          title
          availableForSale
          id
          compareAtPrice {
            amount
            currencyCode
          }
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      options {
        name
        values
      }
      images(first: 1) {
        nodes {
          id
          width
          height
          url
          altText
        }
      }
    }
  }
`;
