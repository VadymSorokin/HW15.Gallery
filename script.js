const albumList = document.querySelector('.album__list');
const albumPhotos = document.querySelector('.album__photos');

function renderAlbums() {
	fetch('https://jsonplaceholder.typicode.com/albums')

		.then((response) => response.json())

		.then((album) => {
			for (let i = 0; i < album.length; i++) {
				const albumItem = document.createElement('li')
				const responseAlbumItem = album[i].title;
				albumItem.innerHTML = responseAlbumItem;
				albumList.append(albumItem);
				albumItem.dataset.idNumber = [i + 1];
			}
		})
}
renderAlbums()

function renderPhotos(albumId = 1) {

	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${Number(albumId)}`)

		.then((response) => response.json())

		.then((photoList) => {
			for (let i = 0; i < photoList.length; i++) {
				const photoUrl = photoList[i].url;
				const photoLi = document.createElement('li');
				const img = document.createElement('img');
				img.src = photoUrl;
				img.alt = 'photo';
				photoLi.append(img);
				albumPhotos.append(photoLi);
			}
		})
}
renderPhotos();

albumList.onclick = function (event) {

	while (albumPhotos.firstChild) {
		albumPhotos.removeChild(albumPhotos.firstChild);
	}
	const target = event.target;
	const albumId = target.dataset.idNumber;
	renderPhotos(albumId);
}
