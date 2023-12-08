document.addEventListener('DOMContentLoaded', async () => {
    const postsList = document.getElementById('posts-list');
    const response = await fetch('/api/posts');
    const posts = await response.json();

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h2>${post.title}</h2>
			<p>Author - ${post.author}</p>
            <h4>${post.content}</h4>
        `;
        postsList.appendChild(listItem);
    });
});