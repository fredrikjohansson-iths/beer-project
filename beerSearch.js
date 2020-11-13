const form = document.getElementById('form');
form.addEventListener('submit', searchName);
const ul = document.getElementById('results')
const div = document.getElementById('resultsArea')

async function searchName(event) {
    event.preventDefault();

    var textInput = document.getElementById('textInput').value

    var inputURL = "https://api.punkapi.com/v2/beers?beer_name=" + textInput

    // const newArr = []

    ul.innerHTML = ""

    axios
        .get(inputURL)
        .then(function (response) {

            const json = response.data;

            // if (json.length > 10) {

            //     for (const i of json) {
            //         newArr.push(i.name);
            //     }

            //     var end = newArr.length;

            //     var pg1 = newArr.slice(0, 10);

            //     var pg2 = newArr.slice(10, 20);

            //     var pg3 = newArr.slice(20, end);

            //     var pages = {
            //         "Page1": pg1,
            //         "Page2": pg2,
            //         "Page3": pg3,
            //     };

            // }


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

                // const nameElement = document.createElement('li')

                link.setAttribute('href', beerURL)


            }


        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {});
}