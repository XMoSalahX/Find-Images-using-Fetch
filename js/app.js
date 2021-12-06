(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID biPfOU7T0oqylU-3TLTxbSETF8u2vmovl1D0owwh0ag'
            }
        }).then(function(response) {
            return response.json();
        }).then(addImage).catch(e => requestError(e, 'image'));;

        function addImage(images) {
            for (i = 0; i < images.results.length; i++) {
                if (images.results[i]) {
                    const firstImage = images.results[i];

                    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`);
                }
            }
        }

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
    });
})();