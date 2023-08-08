let inputSearch = document.querySelector(".search-input");
let btn = document.getElementById("search-button");
let movieContainer = document.querySelector(".movies-container");
const apiKey = "9aac53a2";
let overlay = document.getElementById("overlay");
let modal = document.querySelector(".modal");

//
inputSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        // Викликаємо клік на кнопку, якщо натиснута клавіша "Enter"
        btn.click();
    }
});

let getData = async () => {
    // функція пошуку фільмів за назвою
    movieContainer.textContent = "";
    let data = await getMovieData(movieName);
    //  заповнення DOM елементів інфою з серверу
    for (let i = 0; i < data.Search.length; i++) {
        createElements(
            data.Search[i].Poster, // картинка
            data.Search[i].Title,
            data.Search[i].Type,
            data.Search[i].Year,
            data.Search[i].imdbID
        );
    }
    const moreDetails = document.querySelectorAll(".item-more-details");
    for (let j = 0; j < moreDetails.length; j++) {
        moreDetails[j].addEventListener("click", async function () {
            let getId = moreDetails[j].getAttribute("data-id");
            let oneMData = await getSpecMovieData(getId);
            console.log(oneMData);
            fillModal(oneMData);
            openModal();
            document.addEventListener("click", closeModal);
        });
    }
};

btn.addEventListener("click", getData);
function fillModal(data) {
    document.querySelector(
        ".img-block"
    ).style.backgroundImage = `url(${data.Poster}`;
    document.querySelector(".title").textContent = data.Title;
    document.querySelector(".short-description").textContent =
        data.Rated + " " + data.Year + " " + data.Genre;
    document.querySelector(".long-description").textContent = data.Plot;
    document.querySelector(".writers").textContent = data.Writer;
    document.querySelector(".directedBy").textContent = data.Director;
    document.querySelector(".starring").textContent = data.Actors;
    document.querySelector(".boxOffice").textContent = data.BoxOffice;
    document.querySelector(".awards").textContent = data.Awards;
    for (let i = 0; i < data.Ratings.length; i++) {
        document.querySelector(".ratings").innerHTML +=
            "<br>" + data.Ratings[i].Source + " " + data.Ratings[i].Value;
    }
}

function createElements(poster, fName, type, year, id) {
    let movieItem = document.createElement("div"); // створюємо один екземпляр айтему для одного фільму
    movieContainer.appendChild(movieItem); // вставляємо мувіайтем у муві контейнер
    movieItem.classList.add("movie-item"); // додаємо клас до муві айтема
    // всередині муві айтема
    let itemPictute = document.createElement("div"); // створюємо
    itemPictute.classList.add("item-picture"); // додаємо клас
    movieItem.appendChild(itemPictute); // вставляємо
    // ===========================
    //    картинка
    itemPictute.style.backgroundImage = `url(${poster})`;
    // ===========================

    let itemNameBlock = document.createElement("div"); // створюємо
    itemNameBlock.classList.add("item-name-block"); // даємо клас
    movieItem.appendChild(itemNameBlock); //  вставляємо

    let itemName = document.createElement("div"); // створюємо
    itemName.classList.add("item-name"); // даємо клас
    itemName.textContent = fName; // додаємо вміст
    itemNameBlock.appendChild(itemName); // вставляємо

    let itemType = document.createElement("div"); //  створюємо
    itemType.classList.add("item-type"); //          даємо клас
    movieItem.appendChild(itemType); //         вставляємо
    itemType.textContent = type;

    let itemYear = document.createElement("div"); //  створюємо
    itemYear.classList.add("item-year"); //          даємо клас
    movieItem.appendChild(itemYear); //         вставляємо
    itemYear.textContent = year;

    itemMoreDetails = document.createElement("div"); //  створюємо
    itemMoreDetails.classList.add("item-more-details"); //          даємо клас
    movieItem.appendChild(itemMoreDetails); //         вставляємо
    itemMoreDetails.textContent = "More datails";
    itemMoreDetails.setAttribute("data-ID", id);
}

// Відкриваємо модальне вікно та замутнення
function openModal() {
    modal.style.display = "flex";
    overlay.style.display = "block";
}

// Ф-ція закриття модального вікна та замутнення
function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}

// Функція ПОШУКУ даних про фільм за ім'ям
async function getMovieData(movieName) {
    movieName = document.getElementById("movieName").value;
    const url = "http://www.omdbapi.com/?apikey=9aac53a2&s=" + movieName;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
// ===========================================

// Функція ПОШУКУ конкретного фільму за його ID
async function getSpecMovieData(movieID) {
    const url = "http://www.omdbapi.com/?apikey=9aac53a2&i=" + movieID;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// -----хрестик для очищення інпуту
function clearInput() {
    document.getElementById("movieName").value = "";
}
// ---------------
