const getThreadById = `
query GetThreadContent($id: ID!){
    getThreadById(id: $id){
      _id
      title
      content
      author{
        login
      }
      checks
      messages
      likes
      createdAt
    }
}`;

export default getThreadById;