import api from "./api"

const getArticle = async () => {
    return await api.get(`/articles/${params.id}`)
    .then((response) => response.data.data.article)
}


export default getArticle;