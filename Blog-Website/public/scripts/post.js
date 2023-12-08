document.addEventListener('DOMContentLoaded', () => {
	const postForm = document.getElementById('post-form');

	postForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const title = document.getElementById('title').value;
		const author = document.getElementById('author').value
		const content = document.getElementById('content').value;

		await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, author, content }),
		});

		window.location.href = '/';
	});
});