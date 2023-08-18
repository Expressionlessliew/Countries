const searchBtn = document.getElementById("searchbtn");
const countryContainer = document.getElementById("country-container");

searchBtn.addEventListener("click", getCountry);

function getCountry() {
  // Clear the old data
  countryContainer.innerHTML = "";

  const userSearch = document.getElementById("search").value.trim();

  // API call
  fetch(`https://restcountries.com/v3.1/name/${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        // Check if data is an array of results
        const countryData = data[0]; // Get the first result
        console.log(countryData);

        const container = document.createElement("div");
        container.classList.add("test");

        const countryName = document.createElement("h2");
        countryName.textContent = countryData.name.common;
        container.appendChild(countryName);

        // Check if flags data exists and is a string
        if (countryData.flags && typeof countryData.flags.png === "string") {
          const flagsImage = document.createElement("img");
          flagsImage.src = countryData.flags.png;
          flagsImage.alt = countryData.name.common + " flag";
          container.appendChild(flagsImage);
        }

        // Destructure the maps object
        const { googleMaps, openStreetMaps } = countryData.maps;

        const countryGoogleMapsLink = document.createElement("a");
        countryGoogleMapsLink.href = googleMaps;
        countryGoogleMapsLink.textContent = "Google Maps Link";
        container.appendChild(countryGoogleMapsLink);

        const countryOpenStreetMapsLink = document.createElement("a");
        countryOpenStreetMapsLink.href = openStreetMaps;
        countryOpenStreetMapsLink.textContent = "OpenStreet Maps Link";
        container.appendChild(countryOpenStreetMapsLink);

        const countryOfficialName = document.createElement("p");
        countryOfficialName.textContent =
          "Official Name: " + countryData.name.official;
        container.appendChild(countryOfficialName);

        const countryConti = document.createElement("p");
        countryConti.textContent =
          "Official Continents: " + countryData.continents;
        container.appendChild(countryConti);

        const countryIND = document.createElement("p");
        countryIND.textContent = "Independent: " + countryData.independent;
        container.appendChild(countryIND);

        // const countryOfficialName = document.createElement("p");
        // countryOfficialName.textContent = "Official Name: " + countryData.name.official;
        // container.appendChild(countryOfficialName);

        const countryCapital = document.createElement("p");
        countryCapital.textContent = "Capital: " + countryData.capital[0];
        container.appendChild(countryCapital);

        const countrypopulation = document.createElement("p");
        countrypopulation.textContent = "Population: " + countryData.population;
        container.appendChild(countrypopulation);

        // Append more data fields as needed

        // Append the container to the country container
        countryContainer.appendChild(container);
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
