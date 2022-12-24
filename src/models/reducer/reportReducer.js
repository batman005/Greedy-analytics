import { FETCH_REPORT_SUCCESS, FETCH_REPORT_ERROR,FETCH_APP_SUCCESS,FETCH_APP_ERROR } from "../types";

const initialState = {
    app: {
        reportList: {
            reports: {
                cache_time: 20,
                data: [
                    // ... report data
                ]
            },
            loading: false,
            error: null
        },
        appList: {
            apps: {
                cache_time: 20,
                data: [
                    // ... app data
                ]
            },
            loading: false,
            error: null
        }
    }
};

export default function reportReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORT_SUCCESS:
            return {
                ...state,
                app: {
                    ...state.app,
                    reportList: {
                        reports: action.payload,
                        loading: false,
                        error: null
                    }
                }
            };
        case FETCH_REPORT_ERROR:
            return {
                ...state,
                app: {
                    ...state.app,
                    reportList: {
                        reports: [],
                        loading: false,
                        error: action.payload
                    }
                }
            };
        case FETCH_APP_SUCCESS:
            return {
                ...state,
                app: {
                    ...state.app,
                    appList: {
                        apps: action.payload,
                        loading: false,
                        error: null
                    }
                }
            };
        case FETCH_APP_ERROR:
            return {
                ...state,
                app: {
                    ...state.app,
                    appList: {
                        apps: [],
                        loading: false,
                        error: action.payload
                    }
                }
            };
        default:
            return state;
    }
};