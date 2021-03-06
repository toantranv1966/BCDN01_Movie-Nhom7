import {applyMiddleware, combineReducers, createStore} from 'redux'
import {QuanLyPhimReducer} from '../redux/reducers/QuanLyPhimReducer';
// import {QuanLyUserReducer} from '../redux/reducers/QuanLyUserReducer'
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import {FilmReducer} from './reducers/FilmReducer'

//Cấu hình middleware
import reduxThunk  from 'redux-thunk'

const rootReducer = combineReducers({
    //Nơi kháo các state của ứng dụng
    QuanLyPhimReducer:QuanLyPhimReducer,
    FilmReducer:FilmReducer,
    QuanLyNguoiDungReducer:QuanLyNguoiDungReducer
    // QuanLyUserReducer:QuanLyUserReducer

});

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));


/*
    Thư viện cài đặt
    npm i react-redux
    npm i redux
*/
