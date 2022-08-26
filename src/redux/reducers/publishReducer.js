// Initial State
const INITIAL_STATE = {
    username: "",
    title: "",
    content: "",
};

export const publishReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NICKNAME':
            return { ...state, username: action.payload }
        case 'CREATE_POST':
            return { ...state, title: action.payload.title, content: action.payload.content }
        case 'EDIT_POST':
            return { ...state, title: "TITULO - EDIT", content: "CONTEUDO - EDIT" }
        case 'DELETE_POST':
            return { ...state, username: "", title: "", content: "" }
        default:
            return state
    }
}