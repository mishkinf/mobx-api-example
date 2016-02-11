import {observable, autorun, isObservable} from 'mobservable';
import {LocalStoreAdapter, RestApiStoreAdapter, RegisterNoun } from 'mobservable-api';

const apiHost = 'http://localhost:3001/api';
const store = observable({
    isFakeApi: true,
    articles: { }
});

RegisterNoun('articles', store, new LocalStoreAdapter());

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;
    
    useFakeApi ? RegisterNoun('articles', store, new LocalStoreAdapter()) :
                    RegisterNoun('articles', store, new RestApiStoreAdapter(apiHost)); 
};

export default store;