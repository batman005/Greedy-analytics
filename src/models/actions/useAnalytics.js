import axios from 'axios';
import { appUrl, reportUrl } from '../api/api';
import { FETCH_APP_SUCCESS,FETCH_REPORT_SUCCESS, FETCH_APP_ERROR,FETCH_REPORT_ERROR} from '../types';


export const fetchReport = (startDate, endDate) => {
    return (dispatch) => {
        axios.get(reportUrl, {
            params: {
                startDate,
                endDate,
            }
        })
            .then((response) => {
                dispatch({ type: FETCH_REPORT_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_REPORT_ERROR, payload: error });
            });
    };
};



export const fetchApp = () => {
    return (dispatch) => {
        axios.get(appUrl)
            .then((response) => {
                dispatch({ type: FETCH_APP_SUCCESS, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: FETCH_APP_ERROR, payload: error });
            });
    };
};
