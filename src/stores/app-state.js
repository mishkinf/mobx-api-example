import {observable} from 'mobservable';

const store = observable({
    articles: [],
    isFetchingArticles: false,
    fetchingStatus: ''
});

store.fetchArticles = function(subreddit) {
    store.isFetchingArticles = true;
    store.fetchingStatus = '';
    
    fetch(`http://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => {
            console.log('new json response')
            if(json.data.children != undefined && json.data.children.length > 0)
                store.articles = json.data.children;
            store.isFetchingArticles = false;
        })
        .catch((error) => {
            store.articles = [];
            store.isFetchingArticles = false;
            store.fetchingStatus = 'Cannot find subreddit';
            console.log('There has been a problem with your fetch operation: ' + error.message);
        }); 
};

export default store;