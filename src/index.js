import Notiflix from 'notiflix';
import { lightbox } from './js/simple-lightbox';
import { fetchCard } from './js/pixabay';
import { createMarkup } from './js/markup';
import { refs } from './js/refs';

const { form, button, gallery } = refs;
let searchValue = '';
let page = 1;

const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0,
  };
const observer = new IntersectionObserver(handlerObserver, options);
const target = document.querySelector('#target');
  
form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(e) {
    e.preventDefault();
    searchValue = e.currentTarget.elements.searchQuery.value;
    page = 1;
    if (searchValue.trim() === "") {
        Notiflix.Notify.info('Try again.');
      return;
    }
    try {
      const cardData = await fetchCard(searchValue, page);
      if (cardData.totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        gallery.innerHTML ="";
        return;
    }
      gallery.innerHTML = createMarkup(cardData.hits);

      Notiflix.Notify.info(`Hooray! We found ${cardData.totalHits} images.`);
      observer.observe(target);
      
    } catch {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

   window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    lightbox = new SimpleLightbox('.gallery a');
}
  
async function handlerObserver(entries, observer) {
    entries.forEach(async entry => {
      if (!entry.isIntersecting) {
        return;
      }
      page += 1;
      try {
        const cardData = await fetchCard(searchValue, page);
        gallery.insertAdjacentHTML(
          'beforeend',
          createMarkup(cardData.hits)
        );
        if (page * cardData.hits.length >= cardData.totalHits) {
          observer.unobserve(target);
        }
      } catch {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    });
}