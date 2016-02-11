import {observable} from 'mobservable';
import {LocalStoreAdapter, RestApiStoreAdapter, registerStoreAdapter } from 'api-know';

const store = observable({
    articles: {
        data: [],
        isFetching: false,
        errors: [],
        lastRequest: null
    },
    isFakeApi: true
});

registerStoreAdapter(store, new LocalStoreAdapter(store, 'articles'));

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;
    
    useFakeApi ? registerStoreAdapter(store, new LocalStoreAdapter(store, 'articles')) : 
                  registerStoreAdapter(store, new RestApiStoreAdapter(store, 'articles', 'http://localhost:3001/api')); 
};

store.get = function(noun) {
    console.log(store[noun].data);
    return store[noun];
};

export default store;