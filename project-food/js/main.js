import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openingModal } from './modules/modal';

// FIXME: Сильно увеличил время, чтобы не мешало разработке.
const modalTimerID = setTimeout(() => openingModal('.modal', modalTimerID), 50000);

tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
modal('[data-modal]', '.modal', modalTimerID);
timer('.timer', '2023-12-31');
cards();
forms('form', modalTimerID);
slider({
  container: '.offer__slider',
  nextBtn: '.offer__slider-next',
  prevBtn: '.offer__slider-prev',
  field: '.offer__slider-inner',
  slide: '.offer__slide',
  totalCounter: '#total',
  currentCounter: '#current',
  wrapper: '.offer__slider-wrapper',
});
calc();