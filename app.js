const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const listRef = document.querySelector('[class="gallery js-gallery"]');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const closeModalDiv = document.querySelector('.lightbox__overlay');

const listContentRef = galleryItems.map((galleryItem) => {
  const listItemRef = document.createElement('li');
  listItemRef.classList.add('gallery__item');

  const listLinkRef = document.createElement('a');
  listLinkRef.classList.add('gallery__link');
  listLinkRef.setAttribute('href', galleryItem.original);

  const listImgRef = document.createElement('img');
  listImgRef.classList.add('gallery__image');
  listImgRef.setAttribute('src', galleryItem.preview);
  listImgRef.setAttribute('data-source', galleryItem.original);
  listImgRef.setAttribute('alt', galleryItem.description);
  listImgRef.setAttribute('data-index', galleryItems.indexOf(galleryItem));
  listLinkRef.append(listImgRef);
  listItemRef.append(listLinkRef);

  return listItemRef;
});

listRef.append(...listContentRef);

listRef.addEventListener('click', onGalleryClick);
closeModalBtn.addEventListener('click', closeModalBtnHandler);
closeModalDiv.addEventListener('click', closeModalDivHandler);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const largeImgURL = event.target.dataset.source;
  const largeImgAlt = event.target.alt;
  lightboxImgRef.src = largeImgURL;
  lightboxImgRef.alt = largeImgAlt;
  lightboxRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown',activeBtnRight);
  window.addEventListener('keydown',activeBtnLeft);
}

function closeModalBtnHandler(event) {
  lightboxRef.classList.remove('is-open');
  lightboxImgRef.src = '';
  window.removeEventListener('keydown', onPressEscape);
}

function closeModalDivHandler(event) {
  if (event.target === event.currentTarget) {
    closeModalBtnHandler();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModalBtnHandler();
  }
}

function activeBtnRight(event) {
  if (event.code === 'ArrowRight') {
    lightboxImgRef.setAttribute('src', rightHandle(lightboxImgRef.src));
  }
}

function activeBtnLeft(event) {
  if (event.code === 'ArrowLeft') {
    lightboxImgRef.setAttribute('src', leftHandle(lightboxImgRef.src));
  }
}
// function rightHandle (src) {
//   const originalImgSrc = galleryItems.map(galleryItem => galleryItem.original);
//   const galleryItem = originalImgSrc.filter(galleryItem => galleryItem === src);
//   return originalImgSrc[originalImgSrc.indexOf(...galleryItem) + 1];
// }

function rightHandle(src) {
  const originalImgSrc = galleryItems.map(
    (galleryItem) => galleryItem.original
  );
  const galleryItem = originalImgSrc.findIndex(
    (galleryItem) => galleryItem === src
  );
  console.log(galleryItem);
   return galleryItem === galleryItems.length - 1
    ? originalImgSrc[galleryItem]
    : originalImgSrc[galleryItem + 1];
}

function leftHandle(src) {
  const originalImgSrc = galleryItems.map(
    (galleryItem) => galleryItem.original
  );
  const galleryItem = originalImgSrc.findIndex(
    (galleryItem) => galleryItem === src
  );
  console.log(galleryItem);
   return galleryItem === 0
    ? originalImgSrc[galleryItem]
    : originalImgSrc[galleryItem -1];
}
