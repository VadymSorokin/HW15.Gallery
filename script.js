const albumList = document.querySelector('.album__list');
const albumPhotos = document.querySelector('.album__photos');
const firstAlbumId = getFirstAlbumId;

function init() {
	getFirstAlbumId();
	getAndRenderAlbums();
	getAndRenderPhotos();
	renderAlbumPhotoEventListener();
}
init()

function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function getAndRenderAlbums() {
	sendGetRequestAlbums()
		.then((albums) => createAlbumItem(albums))
}

function createAlbumItem(albums) {
	for (let i = 0; i < albums.length; i++) {
		const albumItem = `<li data-id-number="${[i + 1]}">album ${albums[i].id}: ${albums[i].title}</li>`;
		renderAlbums(albumItem);
	}
}

function renderAlbums(albumItem) {
	albumList.insertAdjacentHTML('beforeend', albumItem);
}

function getFirstAlbumId() {
	return sendGetRequestAlbums()
		.then((response) => getAndRenderPhotos(response[0].id))
}

function getAndRenderPhotos(albumId = firstAlbumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(albumId)}`)
		.then((response) => response.json())
		.then((photoList) => createPhotoList(photoList))
}

function createPhotoList(photoList) {
	for (let i = 0; i < photoList.length; i++) {
		const photo = `<li><img src="${photoList[i].url} alt="photo number ${photoList[i].id}"></li>`;
		renderPhotos(photo);
	}
}

function renderPhotos(photo) {
	albumPhotos.insertAdjacentHTML('beforeend', photo);
}

function renderAlbumPhotoEventListener() {
	albumList.addEventListener('click', (event) => {
		const albumId = event.target.dataset.idNumber;
		clearAlbum();
		getAndRenderPhotos(albumId);
	})
}

function clearAlbum() {
	albumPhotos.innerHTML = '';
}
