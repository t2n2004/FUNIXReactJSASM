import {
  ADD_DEPARTMENTS,
  DEPARTMENTS_LOADING,
  DEPARTMENTS_FAILED,
  ADD_DEPARTMENT_STAFFS,
  DEPARTMENT_STAFFS_LOADING,
  DEPARTMENT_STAFFS_FAILED,
} from "./ActionTypes";

export const Departments = (
  state = {
    departments: [],
    isLoading: false,
    errMess: null,
    selectedDepartmentStaffs: [],
    selectedDepartmentStaffsLoading: false,
    selectedDepartmentStaffsErrMess: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        departments: action.payload,
      };

    case DEPARTMENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, departments: [] };

    case DEPARTMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ADD_DEPARTMENT_STAFFS:
      return {
        ...state,
        selectedDepartmentStaffsLoading: false,
        selectedDepartmentStaffsErrMess: null,
        selectedDepartmentStaffs: action.payload,
      };

    case DEPARTMENT_STAFFS_LOADING:
      return {
        ...state,
        selectedDepartmentStaffs: [],
        selectedDepartmentStaffsErrMess: null,
        selectedDepartmentStaffsLoading: true,
      };

    case DEPARTMENT_STAFFS_FAILED:
      return {
        ...state,
        selectedDepartmentStaffs: [],
        selectedDepartmentStaffsLoading: false,
        selectedDepartmentStaffsErrMess: action.payload,
      };

    default:
      return state;
  }
};
