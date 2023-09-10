import { all } from 'redux-saga/effects';

import Auth from './Auth/saga'
import Book from './Book/saga';

export default function* AppSaga() {
  yield all([
    Auth(),
    Book()
  ]);
}
