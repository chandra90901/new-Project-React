export const createDepartment = (saveData) => {
    return (dispatch) => {
        fetch("http://localhost:5001/api/department", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ departmentName: saveData }),
        })
            .then((response) => dispatch({ type: 'SAVE_SUCCESS' }))
            .catch((error) => { dispatch({ type: 'SAVE_FAILED' }) });
    }
}

export const getDepartmentDetails = () => {
    return (dispatch) => {
        fetch("http://localhost:5001/api/department")
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "GET_DEPARTMENTS_DETAILS_SUCCESS", payload: data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "GET_DEPARTMENTS_DETAILS_FAIL", payload: err.message
                });
            });
    };
};

export const allDeleteDepartment = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:5001/api/department/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "GET_DEPARTMENTS_DETAILS_SUCCESS", payload: data
                });
            })
            .catch((err) => {
                dispatch({
                    type: "GET_DEPARTMENTS_DETAILS_FAIL", payload: err.message
                });
            });
    };
};

export const selectDeleteDepartment = (ids) => {
    return (dispatch) => {
        fetch("http://localhost:5001/api/department/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "DELETE_SELECT_DEPARTMENT_DETAILS_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "DELETE_SELECT_DEPARTMENT_DETAILS_FAIL", payload: err.message });
            });
    };
};