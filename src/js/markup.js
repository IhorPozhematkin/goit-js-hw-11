export function createMarkup(data) {
    return data.map(cardInfo).join('');
  }
  
  function cardInfo({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250", height="180">
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: </b><span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views: </b><span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments: </b><span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads: </b><span>${downloads}</span>
        </p>
      </div>
    </div>`
  }