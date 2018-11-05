
import { DashboardActions, setUserBalance } from './actions';
import { takeEvery, all, put, actionChannel } from 'redux-saga/effects';
import { getTotalUserBalance } from 'businessLogic/serverApi';


function* getUserBalanceAsync() {
    const userBalance = getTotalUserBalance();
    yield put(setUserBalance(userBalance));
}



export function* DashboardSagas() {
    return yield all([
        takeEvery(DashboardActions.GET_USER_BALANCE, getUserBalanceAsync),
    ]);
}