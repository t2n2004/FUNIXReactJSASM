import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const createStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
  })
  .then((response) => response.json())
  .then((staffs) => dispatch(addStaffs(staffs)));
};

export const deleteStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + staff.id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)));
};

export const updateStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
  })
  .then((response) => response.ok && response.json())
  .then((staffs) => staffs && dispatch(addStaffs(staffs)));
};

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

export const fetchDepartmentStaffs = (departmentId) => (dispatch) => {
  dispatch(departmentStaffsLoading());

  return fetch(baseUrl + "departments/" + departmentId)
    .then((response) => response.json())
    .then((staffs) => dispatch(addDepartmentStaffs(staffs)));
};

export const addDepartmentStaffs = (staffs) => ({
  type: ActionTypes.ADD_DEPARTMENT_STAFFS,
  payload: staffs,
});

export const departmentStaffsLoading = () => ({
  type: ActionTypes.DEPARTMENT_STAFFS_LOADING,
});

export const departmentStaffsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENT_STAFFS_FAILED,
  payload: errmess,
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
