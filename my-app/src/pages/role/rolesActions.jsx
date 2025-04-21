export const getRoleDetails = () => {
    return (dispatch) => {

        fetch("http://localhost:5001/api/role")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "GET_ROLES_DETAILS_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "GET_ROLES_DETAILS_FAIL", payload: err.message });
            });
    };
};

export const allDeleteRole = (id) => {
    return (dispatch) => {

        fetch(`http://localhost:5001/api/role/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "DELETE_ROLES_DETAILS_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "DELETE_ROLES_DETAILS_FAIL", payload: err.message });
            });
    };
};

export const selectDeleteRole = (ids) => {
    return (dispatch) => {
        fetch("http://localhost:5001/api/role/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "DELETE_SELECT_ROLE_DETAILS_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "DELETE_SELECT_ROLE_DETAILS_FAIL", payload: err.message });
            });
    };
};

export const postRoles = (roleName) => {
    return (dispatch) => {
        fetch("http://localhost:5001/api/role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roleName: roleName }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "POST_ROLE_SUCCESS", payload: data });
            })
            .catch((error) => {
                dispatch({ type: "POST_ROLE_FAIL", payload: error.message });
            });
    };
};

