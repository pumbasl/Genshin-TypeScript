const getNews = `
query GetNews{
    getNews{
      _id
        title
      subtitle
      text
      author{
        login
      }
      date
    }
  }
`;

export default getNews;