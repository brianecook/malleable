export function setStyleProperty(propertyName, property) {
  document.documentElement.style.setProperty(propertyName, property);
}

export function setSizeStyleProperty(
  propertyName,
  $element,
  property = 'offsetHeight'
) {
  const mediaQueryDesktop = window.matchMedia('(min-width: 1200px)');
  const mediaQueryMobile = window.matchMedia('(max-width: 1199px)');

  // defines size property on load
  setStyleProperty(propertyName, `${$element[property]}px`);

  // updates size property on device size change
  mediaQueryDesktop.addEventListener('change', handleDeviceSizeChange);
  mediaQueryMobile.addEventListener('change', handleDeviceSizeChange);

  function handleDeviceSizeChange(e) {
    if (e.matches) {
      setStyleProperty(propertyName, `${$element[property]}px`);
    }
  }
}
