const albumList = document.querySelector('.album__list');
const albumPhotos = document.querySelector('.album__photos');

function init() {
	renderAlbums();
	getFirstAlbumId()
	renderPhotos();
	renderAlbumPhotoEventListener();
}
init()

function sendGetRequestAlbums() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
}

function renderAlbums() {
	sendGetRequestAlbums()
		.then((album) => {
			for (let i = 0; i < album.length; i++) {
				const albumItem = `<li data-id-number="${[i + 1]}">album ${album[i].id}: ${album[i].title}</li>`;
				albumList.insertAdjacentHTML('beforeend', albumItem);
			}
		})
}

function renderPhotos(albumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(albumId)}`)
		.then((response) => response.json())
		.then((photoList) => {
			for (let i = 0; i < photoList.length; i++) {
				const photo = `<li><img src="${photoList[i].url} alt="photo number ${photoList[i].id} from album ${albumId}"></li>`;
				albumPhotos.insertAdjacentHTML('beforeend', photo);
			}
		})
}

function renderAlbumPhotoEventListener() {
	albumList.addEventListener('click', (event) => {
		const albumId = event.target.dataset.idNumber;
		clearAlbum();
		renderPhotos(albumId);
	})
}

function clearAlbum() {
	while (albumPhotos.firstChild) {
		albumPhotos.removeChild(albumPhotos.firstChild);
	}
}

function getFirstAlbumId() {
	return sendGetRequestAlbums()
		.then((response) => renderPhotos(response[0].id))
}
// Пытался использовать эту функцию , но она не срабатывает. Пишет , что null .
// Хотя функция срабатывает , когда вставлял ее в  renderAlbumPhotoEventListener.
//function getFirstAlbumId() {
//	return albumList.firstElementChild.dataset.idNumber;
//}
