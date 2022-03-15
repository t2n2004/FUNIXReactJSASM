import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (name, doB, startDate, salaryScale) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    name: name,
    doB: doB,
    startDate: startDate,
    salaryScale: salaryScale,
  },
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading());

  return fetch(baseUrl + "departments")
    .then((response) => response.json())
    .then((departments) => dispatch(addDepartments(departments)));
};

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchSalaries = () => (dispatch) => {
  dispatch(salariesLoading());

  return fetch(baseUrl + "staffsSalary")
    .then((response) => response.json())
    .then((salaries) => dispatch(addSalaries(salaries)));
};

export const salariesLoading = () => ({
  type: ActionTypes.SALARIES_LOADING,
});

export const salariesFailed = (errmess) => ({
  type: ActionTypes.SALARIES_FAILED,
  payload: errmess,
});

export const addSalaries = (salaries) => ({
  type: ActionTypes.ADD_SALARIES,
  payload: salaries,
});
