const addThread = `
mutation AddNewThread($title: String!, $content: String!) {
    addNewThread(title: $title, content: $content) {
      _id
      title
      content
      author {
        login
      }
      checks
      messages
      likes
      createdAt
    }
}`;

export default addThread;