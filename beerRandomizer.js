async function getRandom() {
    axios
        .get('https://api.punkapi.com/v2/beers/random')
        .then(function(response) {
            const data = response.data;

            for (const i of data) {

                const imageText = document.getElementById('randomName')
                const image = document.getElementById('randomLabel')
                const link = document.getElementById('randomLink')

                const imageURL = i.image_url ?? './placeholder.png'
                const beerId = i.id
                const beerURL = './infoPage.html?beerId=' + beerId

                const nameElement = document.createElement('p')
                const nameNode = document.createTextNode(`${i.name}`)
                nameElement.appendChild(nameNode)


                imageText.innerHTML = '';
                imageText.appendChild(nameElement)
                image.src = imageURL

                link.href = beerURL
            }

        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

getRandom();