const initialState = {
    rolesData: [],
    fetchRolesDataSuccess: false,
    fetchRolesDataFail: false
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "POST_ROLE_SUCCESS":
            return { ...state, rolesData: action.payload, fetchRolesDataSuccess: true };

        case "POST_ROLE_FAIL":
            return { ...state, rolesData: [], fetchRolesDataFail: true };

        case "GET_ROLES_DETAILS_SUCCESS":
            return { ...state, rolesData: action.payload, fetchRolesDataSuccess: true };

        case "GET_ROLES_DETAILS_FAIL":
            return { ...state, rolesData: [], fetchRolesDataFail: true };

        case "DELETE_ROLES_DETAILS_SUCCESS":
            return { ...state, rolesData: action.payload, fetchRolesDataSuccess: true };

        case "DELETE_ROLES_DETAILS_FAIL":
            return { ...state, fetchRolesDataFail: true };

        case "DELETE_SELECT_ROLE_DETAILS_SUCCESS":
            return { ...state, rolesData: action.payload, fetchRolesDataSuccess: true };

        case "DELETE_SELECT_ROLE_DETAILS_FAIL":
            return { ...state, fetchRolesDataFail: true };

        default:
            return state;
    }
};

export default rolesReducer;