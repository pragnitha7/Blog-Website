document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const searchPosts = async () => {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter keywords to search.');
            return;
        }

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            const results = await response.json();

            displaySearchResults(results);
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    const displaySearchResults = (results) => {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        results.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
				
                <h2>${post.title}</h2>
				<p>Author - ${post.author}</p>
            	<h4>${post.content}</h4>
                
            `;
            searchResults.appendChild(listItem);
        });
    };

    document.getElementById('searchButton').addEventListener('click', searchPosts);
});
