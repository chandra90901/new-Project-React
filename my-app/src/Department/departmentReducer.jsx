const departmentData = {
    departmentsdata: [],
    saveSuccess: false,
    saveFailed: false
}

const reducer = (state = departmentData, action) => {
    switch (action.type) {
        case "SAVE_SUCCESS":
            return { ...state, saveSuccess: true };
        case "SAVE_FAILED":
            return { ...state, saveFailed: true };

        case "GET_DEPARTMENTS_DETAILS_SUCCESS":
            return { ...state, departmentsdata: action.payload, saveSuccess: true };

        case "GET_DEPARTMENTS_DETAILS_FAIL":
            return { ...state, departmentsdata: [], saveFailed: true };

        case "DELETE_DEPARTMENTS_DETAILS_SUCCESS":
            return { ...state, departmentsdata: action.payload, saveSuccess: true };

        case "DELETE_DEPARTMENTS_DETAILS_FAIL":
            return { ...state, saveFailed: true };

        case "DELETE_SELECT_DEPARTMENTS_DETAILS_SUCCESS":
            return { ...state, departmentsdata: action.payload, saveSuccess: true };

        case "DELETE_SELECT_DEPARTMENTS_DETAILS_FAIL":
            return { ...state, saveFailed: true };

        default:
            return state;
    }
};

export default reducer;