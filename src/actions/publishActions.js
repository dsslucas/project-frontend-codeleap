import axios from 'axios'

// URL
const URL = 'https://dev.codeleap.co.uk/careers/'

//Nickname
export const changeNickname = (description) => ({
    type: "NICKNAME",
    payload: description
})

//POST
export const post = (description) => ({
    type: "CREATE_POST",
    payload: description
},
    axios.post(URL, {
        username: description.username,
        title: description.titulo,
        content: description.conteudo
    }))

//PUT
export const patch = (description) => ({
    type: "EDIT_POST",
    payload: description
},
    axios.patch(`${URL}${description.idPostSelected}/`, { title: description.titulo, content: description.conteudo})
)

//DELETE
export const del = (description) => ({
    type: "DELETE_POST",
    payload: description
},
    axios.delete(`${URL}${description.idPostSelected}/`)
)   