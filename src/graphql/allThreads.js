const allThreads = `
query AllThreads{
    threads{
        _id
        title
        author{
        login
        }
        checks
        messages
        likes
        createdAt
    }
}`;

export default allThreads;