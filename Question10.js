async function fetchPosts() {
  try {
    // Make the request
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    // Convert response to JSON
    const posts = await response.json();
    
    // Loop through the first 5 posts
    for (let i = 0; i < 5; i++) {
      console.log(posts[i].title);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

fetchPosts();



