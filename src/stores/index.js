import { observable, autorun, isObservable } from 'mobx';
import { LocalStoreAdapter, SessionStoreAdapter, RestApiStoreAdapter, StoreAdapter } from 'mobx-api';
import { API } from '../config/vars';

// 1. Create an observable store with your nouns
const store = observable({
    isFakeApi: true,
    articles: {},
    randomstuff: {}
});

const storeAdapter = new StoreAdapter(store);
const adapters = {
  localStorage: new LocalStoreAdapter(),
  sessionStorage: new SessionStoreAdapter(),
  railsApi: new RestApiStoreAdapter(API.host, API.headers)
}

// 2. Register your nouns and attach a mobx-api adapter to the noun
storeAdapter.registerAdapter('articles', adapters.localStorage);
storeAdapter.registerAdapter('randomstuff', adapters.sessionStorage);

store.articles.readAll();
store.randomstuff.readAll();

store.setFakeApi = function(useFakeApi) {
    store.isFakeApi = useFakeApi;

    if(useFakeApi) {
      storeAdapter.registerAdapter('articles', adapters.localStorage);
    } else {
      storeAdapter.registerAdapter('articles', adapters.railsApi);
    }
};

export default store;
