// https://flickr.com/services/rest/?api_key=e136f8a3330ec74ca9f3ad673062af6e&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog

var x = document.getElementById("demo");

var displayImageIndex = 0;

let imageURL = [];

const image = document.getElementById("image");
const box = document.getElementById("box");
box.addEventListener("click", async function () {
    const latitudeAndLongitude = await getLocation();
    const userInput = getUserInput();
    showPosition(latitudeAndLongitude, userInput)
});

const nextImage = document.getElementById("next");
nextImage.addEventListener("click", async function () {
    if (displayImageIndex === 4) {
        displayImageIndex = 0;
    } else {
        displayImageIndex++;
    }
    displayImage();
});

const testBox = document.getElementById("textBox");
testBox.addEventListener("change", async function () {
    displayImageIndex = 0;
    imageURL = [];
});

function getUserInput () {
    const textBox = document.getElementById("textBox")
    return textBox.value;
}



function getLocation () {
    return new Promise(resolve => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                resolve([latitude, longitude]);
            });
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    })
}

function showPosition (latitudeAndLongitudeArray, userInput) {
    // x.innerHTML = "Latitude: " + latitudeAndLongitudeArray[0] +
    //     "<br>Longitude: " + latitudeAndLongitudeArray[1];
    var finalURL = "https://cors-anywhere.herokuapp.com/https://flickr.com/services/rest/?api_key=e136f8a3330ec74ca9f3ad673062af6e&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=" + latitudeAndLongitudeArray[0] + "&lon=" + latitudeAndLongitudeArray[1] + "&text=" + userInput;
    fetch(finalURL).then(res => res.json())
        .then(data => {
            console.log(data)
            let photoArray = data.photos.photo;
            imageUrl = constructImageURL(photoArray);
            image.style.backgroundImage = `url(${imageURL[displayImageIndex]})`
            image.style.width = "700px";
            image.style.height = "700px";
            image.style.backgroundSize = "cover";
        })
}

function displayImage () {
    image.style.backgroundImage = `url(${imageURL[displayImageIndex]})`
    image.style.width = "700px";
    image.style.height = "700px";
    image.style.backgroundSize = "cover";
}

function constructImageURL (photoArray) {
    for (let i = 0; i < 5; i++) {
        imageURL.push("https://farm" + photoArray[i].farm +
            ".staticflickr.com/" + photoArray[i].server +
            "/" + photoArray[i].id + "_" + photoArray[i].secret + ".jpg");
    }
}
console.log('imageURL', imageURL);
