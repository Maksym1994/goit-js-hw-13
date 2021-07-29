import './css/styles.css';
import '../node_modules/simplelightbox/src/simple-lightbox.scss';
import NewsApiService from './js/apiService';
import Notiflix from 'notiflix';
import { refs } from './js/getRefs';
import cards from './templates/cards.hbs';
import SimpleLightbox from "simplelightbox";

var lightbox = new SimpleLightbox('.gallery a');

const newsApiService = new NewsApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

refs.loadMoreBtn.classList.add('is-hidden');


async function onSearch(e){
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    
     refs.loadMoreBtn.classList.add('is-hidden');
    
     try {
        const result = await newsApiService.fetchArticles();
         if (newsApiService.query !== '') {

             if (result.hits.length === 0) {
                 clearCardsCounteiner();
                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                
             } else {
           
                 clearCardsCounteiner();
                 Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
                 appendCardsMarkup(result.hits);
            
                 lightbox.refresh();
                 refs.loadMoreBtn.classList.remove('is-hidden');
             }
         } else {
                 clearCardsCounteiner();
                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
         }
   } catch (error) {
       console.log(error);
   }
}

async function onLoad (){
    try { 
        refs.loadMoreBtn.disabled = true;
        const result = await newsApiService.fetchArticles();
        appendCardsMarkup(result.hits);
        refs.loadMoreBtn.disabled = false;
        const lenghtHits = refs.imageGallery.querySelectorAll('.photo-card').length;
      
        
        if (lenghtHits >= result.totalHits){
            Notiflix.Notify.failure("We are sorry, but you have reached the end of search results.");
            refs.loadMoreBtn.classList.remove('is-hidden');
            
        } else {
            lightbox.refresh();
        }

    }
        catch (error){
            console.log(error)
        }
       
    } 
    
function appendCardsMarkup(data){
 refs.imageGallery.insertAdjacentHTML('beforeend', cards(data));
};

function clearCardsCounteiner () {
    refs.imageGallery.innerHTML = '';
}