import react from "react"
const createBlog = ({ title, author, url, setTitle, setAuthor, setUrl, handleBlogCreation }) => (
  <div>
    <form onSubmit={handleBlogCreation}>
      <>title: </>
      <input 
      type="text" 
      value={title}
      onChange={({ target }) => setTitle(target.value)}
      /> <br />
      <>author: </>
      <input 
      type="text" 
      value={author}
      onChange={({ target }) => setAuthor(target.value)}
      /> <br />
      <>url: </>
      <input 
      type="text"
      value={url} 
      onChange={({ target }) => setUrl(target.value)}
      /> <br />
      <button type="submit">create</button>
    </form>
  </div>
)

export default createBlog