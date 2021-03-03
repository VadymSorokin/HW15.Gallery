const albumList = document.querySelector('.album__list');
const albumPhotos = document.querySelector('.album__photos');

fetch('https://jsonplaceholder.typicode.com/albums')

	.then((response) => response.json())

	.then((response) => {
		for (let i = 0; i < response.length; i++) {
			const albumItem = document.createElement('li');
			const responseAlbumItem = response[i].title;
			albumItem.classList.add('album__item');
			albumItem.innerHTML = responseAlbumItem;
			albumList.append(albumItem);
			albumItem.dataset.idNumber = [i + 1];
		}
	})

fetch('https://jsonplaceholder.typicode.com/photos')

	.then((response) => response.json())

	.then((response) => {
		
		for (let i = 0; i < response.length; i++) {
			const photoAlbumId = response[i].albumId;
			const photoUrl = response[i].url;
			if (photoAlbumId === 1) {
				const photoLi = document.createElement('li');
				const img = document.createElement('img');
				img.src = photoUrl;
				img.alt = 'photo';
				photoLi.append(img);
				albumPhotos.append(photoLi);
			}
		}
	})

albumList.onclick = function (event) {
	const target = event.target;
	const targetId = target.dataset.idNumber;

	while (albumPhotos.firstChild) {
		albumPhotos.removeChild(albumPhotos.firstChild);
	}

	fetch('https://jsonplaceholder.typicode.com/photos')

		.then((response) => response.json())

		.then((response) => {
			for (let i = 0; i < response.length; i++) {
				const photoAlbumId = response[i].albumId;
				const photoUrl = response[i].url;

				if (photoAlbumId == targetId) {
					const photoLi = document.createElement('li');
					const img = document.createElement('img');
					img.src = photoUrl;
					img.alt = 'photo';
					photoLi.append(img);
					albumPhotos.append(photoLi);
				}
			}
		})
}
