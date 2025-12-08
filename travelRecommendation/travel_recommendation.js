let destinations = {};

function fetchDestinations() {
    const url = "./travel_recommendation_api.json";
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            destinations = data;
        })
        .catch((e) => console.log(e))
}

fetchDestinations();

function clearSearchResults() {
    document.getElementById("search_input").value = "";
    document.querySelector(".search_results").innerHTML = "";
}

function renderResults(results = []) {
    document.querySelector(".search_results").innerHTML = "";
    const resultsDiv = document.querySelector(".search_results")
    if (!results.length) {
        const noResultsP = document.createElement("p");
        noResultsP.style.cssText = "text-align: center; color: #fafafa; font-weight: bold; padding: 1rem; font-size: 24px;"
        noResultsP.innerText = "No results, yet!";
        resultsDiv.appendChild(noResultsP);
        return;
    }
    results.forEach((result) => {
        const resultCard = document.createElement("div");
        resultCard.classList.add("search_result");
        const resultName = document.createElement("div");
        resultName.classList.add("search_result_name");
        resultName.innerText = result.name;
        const resultImg = document.createElement("img");
        resultImg.src = result.imageUrl;
        resultImg.alt = result.name;
        resultImg.classList.add("search_result_img");
        const resultDescription = document.createElement("div");
        resultDescription.classList.add("search_result_description");
        resultDescription.innerText = result.description;
        resultCard.appendChild(resultName);
        resultCard.appendChild(resultImg);
        resultCard.appendChild(resultDescription);
        resultsDiv.appendChild(resultCard);
    });
}

function handleSearch() {
    const searchInput = document.getElementById("search_input");
    const parsedInput = searchInput.value.toLowerCase().trim();
    if (parsedInput.includes("beach")) {
        renderResults(destinations["beaches"]);
    } else if (parsedInput.includes("count")) {
        renderResults(destinations["countries"]
            .reduce((acc, country) => {
                country.cities.forEach((city) => acc.push(city));
                return acc;
            }, []));
    } else if (parsedInput.includes("temple")) {
        renderResults(destinations["temples"]);
    }  else {
    renderResults();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});