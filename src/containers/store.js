import {createStore, applyMiddleware, Store, compose} from 'redux';
import createSagaMiddleware, {Task} from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';
import { useSelector } from 'react-redux';

export const makeStore = (context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  let composeEnhancers = compose;

  if (typeof window !== "undefined") {
     composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  


  // 2: Add an extra parameter for applying middleware:
  const store = createStore(reducer(), composeEnhancers(applyMiddleware(sagaMiddleware)));

  // 3: Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export const useAppSelector = useSelector;

const storeContainer = makeStore();
export default storeContainer;