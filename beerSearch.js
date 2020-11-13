const form = document.getElementById('form');
const ul = document.getElementById('results')
const div = document.getElementById('resultsArea')
const pageNav = document.getElementById('pageNav')
const next = document.getElementById('next')
const previous = document.getElementById('previous')

next.addEventListener('onclick', nextPage);
previous.addEventListener('onclick', previousPage);
form.addEventListener('submit', searchName);

var currentPage = 1;

async function nextPage() {

    currentPage++
    searchName(event)

}

function previousPage() {

    currentPage--
    searchName(event)
}


async function searchName(event) {
    event.preventDefault();

    var maxPage = `&page=${currentPage}&per_page=10`

    var textInput = document.getElementById('textInput').value

    var inputURL = "https://api.punkapi.com/v2/beers?beer_name=" + textInput + maxPage

    ul.innerHTML = ""

    pageNav.classList.remove('hide')

    axios
        .get(inputURL)
        .then(function (response) {

            const json = response.data;

            const brewNames = json.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }

                if (b.name > a.name) {
                    return -1;
                }

                return 0;
            });


            for (const i of brewNames) {

                const beerURL = './infoPage.html?beerId=' + i.id

                const li = document.createElement("li");

                const link = document.createElement('a')

                const textNode = document.createTextNode(i.name)

                link.appendChild(textNode)

                li.appendChild(link)

                ul.appendChild(li)

                link.setAttribute('href', beerURL)


            }

            

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {});
}