// import { getExampleApi } from "@/api/example";
import { takeLatest, put, call } from "redux-saga/effects";
import { AUTH } from "./constants";
import { loginSuccess } from "./actions";
import { loginApi } from "../../api/Auth";
import { setToken } from "../../utilities/cookies";

function* handlerLogin(props) {
  try {
    const { username, password } = props;
    const res = yield call(loginApi, { username, password });
    setToken(res.data?.token)
    yield put(loginSuccess());
  } catch (err) {
    console.log("err handlerLogin", err);
  }
}

function* root() {
  yield takeLatest(AUTH.AUTH_LOGIN, handlerLogin);
}

export default root;
