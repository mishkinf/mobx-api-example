import { observable, autorun, isObservable } from 'mobx';
import { LocalStoreAdapter, RestApiStoreAdapter, RegisterNoun } from 'mobx-api';
import { API_HOST } from '../config/vars';

// 1. Create an observable store with your nouns
const store = observable({
    isFakeApi: true,
    articles: {},
    randomstuff: {}
});

// 2. Register your nouns and attach a mobx-api adapter to the noun
RegisterNoun('articles', store, new LocalStoreAdapter());
RegisterNoun('randomstuff', store, new LocalStoreAdapter());

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;

    if(useFakeApi) {
      RegisterNoun('articles', store, new LocalStoreAdapter());
    } else {
      RegisterNoun('articles', store, new RestApiStoreAdapter(API_HOST, 'article'));
    }
};

export default store;
