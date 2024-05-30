import select from 'selectricity';

export default class AccordionItem extends HTMLElement {
  constructor() {
    super();

    const $accordion = select('[data-accordion]', this);

    $accordion.listen('click', () => {
      $accordion.toggleClass('c-accordion--open');
    });
  }
}
