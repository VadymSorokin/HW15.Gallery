const albumList = document.querySelector('.album__list');
const albumPhotos = document.querySelector('.album__photos');

function init() {
	renderAlbums();
	renderPhotos();
	renderAlbumPhotoEventListener();
}
init()

function renderAlbums() {
	fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
		.then((album) => {
			for (let i = 0; i < album.length; i++) {
				const albumItem = `<li data-id-number="${[i + 1]}">album ${album[i].id}: ${album[i].title}</li>`;
				albumList.insertAdjacentHTML('beforeend', albumItem);
			}
		})
}

function renderPhotos(albumId = 1) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
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
		while (albumPhotos.firstChild) {
			albumPhotos.removeChild(albumPhotos.firstChild);
		}
		const albumId = event.target.dataset.idNumber;
		renderPhotos(albumId);
	})
}
