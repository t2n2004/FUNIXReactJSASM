import * as ActionTypes from './ActionTypes';
import { STAFFS } from '../shared/staffs';

export const addStaff = (name, doB, startDate, salaryScale) => ({
    type: ActionTypes.ADD_STAFF,
    payload: {
        name: name,
        doB: doB,
        startDate: startDate,
        salaryScale: salaryScale
    }
});

export const fetchStaffs = () => (dispatch) => {

    dispatch(staffsLoading(true));

    setTimeout(() => {
        dispatch(addStaffs(STAFFS));
    }, 2000);
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});