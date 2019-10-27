'use strict';

import galleryItems from './gallery-items.js';

const createGalleryItems = galleryItems.reduce((acc, item) => {
  acc += ` <li class='gallery__item'>
  <a class="gallery__link" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" data-source="${item.original}"
  alt="${item.description}"/>

 <span class="gallery__icon">
   <i class="material-icons">zoom_out_map</i>
 </span>
 </a>
 </li>`;
  return acc;
}, '');
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightboxOpen: document.querySelector('.js-lightbox'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox___image'),
  lightboxBtnClose: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};
refs.gallery.insertAdjacentHTML('beforeend', createGalleryItems);

const handleClick = event => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  lightboxIsOpen(target);
};

refs.gallery.addEventListener('click', handleClick);

function isOpen() {
  refs.lightboxOpen.classList.add('is-open');
  window.addEventListener('keydown', handleKeyPress);
}
function isClose() {
  refs.lightboxOpen.classList.remove('is-open');
  window.removeEventListener('keydown', handleKeyPress);
  refs.lightboxImage.setAttribute('src', '');
  refs.lightboxImage.setAttribute('alt', '');
}
function handleKeyPress() {
  if (event.code !== 'Escape') {
    return;
  }
  isClose();
}
function isCloseBoxContent(e) {
  if (e.target !== e.currentTarget) return;

  isClose();

  refs.lightboxContent.removeEventListener('click', isCloseBoxContent);
}
function lightboxIsOpen(elem) {
  const source = elem.dataset.source;
  const alt = elem.getAttribute('alt');
  refs.lightboxImage.setAttribute('alt', alt);
  refs.lightboxImage.setAttribute('src', source);
  refs.lightboxContent.addEventListener('click', isCloseBoxContent);
  refs.lightboxBtnClose.addEventListener('click', isClose);
  isOpen();
}
