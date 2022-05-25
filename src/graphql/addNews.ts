const addNews = `
mutation AddNews($title: String!, $subtitle: String!, $text: String!){
    addNews(title: $title, subtitle: $subtitle, text: $text){
      _id
    }
}`;

export default addNews;