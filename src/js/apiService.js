import axios from "axios";

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = '';

    }

    async fetchArticles() {
        const KEY = '22683403-802ec757cc56aeed5d838f42d';
        const URL = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const response = await axios.get(URL);
        this.page += 1;
        return response.data;
    }
        
    resetPage() {
        this.page = 1;
    };
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
