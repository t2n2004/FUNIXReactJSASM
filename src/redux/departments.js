import {
  ADD_DEPARTMENTS,
  DEPARTMENTS_LOADING,
  DEPARTMENTS_FAILED,
} from "./ActionTypes";

export const Departments = (
  state = { departments: [], isLoading: false, errMess: null },
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

    default:
      return state;
  }
};
