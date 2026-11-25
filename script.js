
/* =================================
   ETERNALLY - MAIN JAVASCRIPT
================================= */

// =================================
// GET HTML ELEMENTS
// =================================

const openingScreen = document.getElementById("openingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const memoriesScreen = document.getElementById("memoriesScreen");
const musicScreen = document.getElementById("musicScreen");

const openSurprise = document.getElementById("openSurprise");
const continueButton = document.getElementById("continueButton");
const viewMemoriesButton = document.getElementById("viewMemoriesButton");

const memoryLightbox = document.getElementById("memoryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightboxButton = document.getElementById("closeLightbox");


// =================================
// HELPER: SCROLL TO TOP
// =================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =================================
// OPEN THE ANNIVERSARY SURPRISE
// =================================

if (openSurprise) {
    openSurprise.addEventListener("click", () => {

        if (openingScreen) {
            openingScreen.style.display = "none";
        }

        if (welcomeScreen) {
            welcomeScreen.classList.add("show");
        }

        scrollToTop();
    });
}


// =================================
// BEGIN OUR LOVE STORY
// =================================

if (continueButton) {
    continueButton.addEventListener("click", () => {

        if (welcomeScreen) {
            welcomeScreen.style.display = "none";
        }

        if (storyScreen) {
            storyScreen.classList.add("show");
        }

        scrollToTop();
    });
}


// =================================
// OPEN OUR MEMORIES
// =================================

if (viewMemoriesButton) {
    viewMemoriesButton.addEventListener("click", () => {

        const calendar = document.getElementById("calendar-screen");
        const forever = document.getElementById("forever-screen");

        if (storyScreen) storyScreen.classList.remove("show");
        if (calendar) calendar.classList.remove("show");
        if (forever) forever.classList.remove("show");

        if (memoriesScreen) {
            memoriesScreen.classList.add("show");
        }

        scrollToTop();
    });
}


// =================================
// UNIVERSAL IMAGE LIGHTBOX
// USED BY MEMORIES, LYRICS & JOKES
// =================================

function openImageLightbox(image) {

    if (!image || !memoryLightbox || !lightboxImage) {
        return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Our special memory";

    memoryLightbox.classList.add("show");

}


// CLOSE LIGHTBOX

function closePhoto() {

    if (!memoryLightbox || !lightboxImage) {
        return;
    }

    memoryLightbox.classList.remove("show");

    lightboxImage.src = "";
    lightboxImage.alt = "";
}


// CLOSE BUTTON

if (closeLightboxButton) {
    closeLightboxButton.addEventListener("click", closePhoto);
}


// CLOSE WHEN CLICKING OUTSIDE THE IMAGE

if (memoryLightbox) {

    memoryLightbox.addEventListener("click", (event) => {

        if (event.target === memoryLightbox) {
            closePhoto();
        }

    });

}


// CLOSE WITH ESCAPE KEY

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closePhoto();
    }

});


// =================================
// MEMORIES PHOTO GALLERY
// =================================

document.querySelectorAll(".memory-photo").forEach((photo) => {

    photo.addEventListener("click", () => {

        const image = photo.querySelector("img");

        openImageLightbox(image);

    });

});


// =================================
// SPECIAL DATES CALENDAR
// =================================

(function () {

    const calendarDays = document.getElementById("calendar-days");

    if (!calendarDays) {
        console.error("Calendar dates container could not be found.");
        return;
    }

    calendarDays.innerHTML = "";

    const specialDates = {

        10: {
            type: "met-date",
            symbol: "✦",
            heading: "The Day Our Paths Crossed",
            label: "10 NOVEMBER 2025",
            message:
                "Before there was an us, there was a first hello. A day when two paths crossed, without knowing what beautiful things lay ahead."
        },

        28: {
            type: "dating-date",
            symbol: "♥",
            heading: "The Day We Became Us",
            label: "28 NOVEMBER 2025",
            message:
                "And then came the day we chose each other. The beginning of something beautiful, something worth cherishing, something we hope will last eternally."
        }

    };

    const firstDay = new Date(2025, 10, 1).getDay();
    const totalDays = new Date(2025, 11, 0).getDate();

    // EMPTY SPACES BEFORE NOVEMBER 1

    for (let i = 0; i < firstDay; i++) {

        const emptyCell = document.createElement("div");

        emptyCell.className = "calendar-day empty";

        calendarDays.appendChild(emptyCell);

    }

    // GENERATE NOVEMBER DATES

    for (let day = 1; day <= totalDays; day++) {

        const dateCell = document.createElement("div");

        dateCell.className = "calendar-day";

        const dateNumber = document.createElement("span");

        dateNumber.textContent = day;

        dateCell.appendChild(dateNumber);

        if (specialDates[day]) {

            const special = specialDates[day];

            dateCell.classList.add("special-date", special.type);

            const symbol = document.createElement("span");

            symbol.className = "date-symbol";
            symbol.textContent = special.symbol;

            dateCell.appendChild(symbol);

            dateCell.setAttribute("role", "button");
            dateCell.setAttribute("tabindex", "0");
            dateCell.setAttribute("aria-label", special.label);

            function showMemory() {

                const messageBox = document.getElementById("calendar-message");

                if (!messageBox) return;

                messageBox.innerHTML = `
                    <span class="message-ornament">${special.symbol}</span>
                    <p class="message-date">${special.label}</p>
                    <h3>${special.heading}</h3>
                    <p class="message-text">${special.message}</p>
                `;

                messageBox.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            }

            dateCell.addEventListener("click", showMemory);

            dateCell.addEventListener("keydown", (event) => {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();

                    showMemory();

                }

            });

        }

        calendarDays.appendChild(dateCell);

    }

    console.log("ETERNALLY calendar generated successfully.");

})();


// =================================
// OPEN CALENDAR FROM OUR STORY
// =================================

function openCalendar() {

    const story = document.querySelector(".story-screen");
    const calendar = document.getElementById("calendar-screen");

    if (!story || !calendar) {
        console.error("Our Story or Calendar section could not be found.");
        return;
    }

    story.classList.remove("show");
    calendar.classList.add("show");

    scrollToTop();

}


function backToStory() {

    const story = document.querySelector(".story-screen");
    const calendar = document.getElementById("calendar-screen");

    if (!story || !calendar) return;

    calendar.classList.remove("show");
    story.classList.add("show");

    scrollToTop();

}


// =================================
// OUR FOREVER COUNTER
// =================================

function updateForeverCounter() {

    const startDate = new Date(2025, 10, 28, 0, 0, 0);

    const now = new Date();

    let difference = now.getTime() - startDate.getTime();

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    const daysElement = document.getElementById("forever-days");
    const hoursElement = document.getElementById("forever-hours");
    const minutesElement = document.getElementById("forever-minutes");
    const secondsElement = document.getElementById("forever-seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateForeverCounter();

setInterval(updateForeverCounter, 1000);


// =================================
// OUR FOREVER NAVIGATION
// =================================

function openForever() {

    const calendarScreen = document.getElementById("calendar-screen");
    const foreverScreen = document.getElementById("forever-screen");

    if (!calendarScreen || !foreverScreen) return;

    calendarScreen.classList.remove("show");
    foreverScreen.classList.add("show");

    scrollToTop();

}


function backToCalendar() {

    const calendarScreen = document.getElementById("calendar-screen");
    const foreverScreen = document.getElementById("forever-screen");

    if (!calendarScreen || !foreverScreen) return;

    foreverScreen.classList.remove("show");
    calendarScreen.classList.add("show");

    scrollToTop();

}


// =================================
// OUR SONG PLAYER
// =================================

const vinylRecord = document.getElementById("vinylRecord");
const ourSong = document.getElementById("ourSong");

const playPauseButton = document.getElementById("playPauseButton");
const playPauseIcon = document.getElementById("playPauseIcon");
const musicStatus = document.getElementById("musicStatus");


// PLAY AND PAUSE

if (playPauseButton && ourSong) {

    playPauseButton.addEventListener("click", async () => {

        if (ourSong.paused) {

            try {

                await ourSong.play();

                if (vinylRecord) {
                    vinylRecord.classList.add("playing");
                }

                if (playPauseIcon) {
                    playPauseIcon.textContent = "Ⅱ";
                }

                playPauseButton.setAttribute("aria-label", "Pause song");

                if (musicStatus) {
                    musicStatus.textContent = "NOW PLAYING OUR SONG ♥";
                }

            } catch (error) {

                console.error("Unable to play the song:", error);

                if (musicStatus) {
                    musicStatus.textContent = "COULD NOT PLAY THE SONG";
                }

            }

        } else {

            ourSong.pause();

        }

    });

}


// SONG PLAY EVENT

if (ourSong) {

    ourSong.addEventListener("play", () => {

        if (vinylRecord) {
            vinylRecord.classList.add("playing");
        }

    });

    // SONG PAUSE EVENT

    ourSong.addEventListener("pause", () => {

        if (vinylRecord) {
            vinylRecord.classList.remove("playing");
        }

        if (playPauseIcon) {
            playPauseIcon.textContent = "▶";
        }

        if (playPauseButton) {
            playPauseButton.setAttribute("aria-label", "Play song");
        }

        if (musicStatus) {
            musicStatus.textContent = "PAUSED — OUR SONG ♥";
        }

    });

    // SONG ENDS

    ourSong.addEventListener("ended", () => {

        if (vinylRecord) {
            vinylRecord.classList.remove("playing");
        }

        if (playPauseIcon) {
            playPauseIcon.textContent = "▶";
        }

        if (playPauseButton) {
            playPauseButton.setAttribute("aria-label", "Play song");
        }

        if (musicStatus) {
            musicStatus.textContent = "A SONG THAT WILL ALWAYS BE OURS ♥";
        }

    });

}


// =================================
// NAVIGATION TO OUR SONG
// =================================

function openMusicScreen() {

    if (!musicScreen || !memoriesScreen) return;

    memoriesScreen.classList.remove("show");
    musicScreen.classList.add("show");

    scrollToTop();

}


// =================================
// OUR LYRICS GALLERY
// =================================

const lyricsGallery = document.getElementById("lyricsGallery");

const lyricPhotos = [

    "akon-hold-my-hand.jpg",
    "anyone-jb.jpg",
    "anyone-justin-bieber.jpg",
    "anyone-justin.jpg",
    "anyone.jpg",
    "beautiful-people.jpg",
    "best-of-me-tsoul.jpg",
    "best-of-me.jpg",
    "best-of-meee.jpg",
    "blueberry-skies.jpg",
    "can't-help-falling-in-love.jpg",
    "cant-help-falling-inlove.jpg",
    "cant-help-falling.jpg",
    "cant-help.jpg",
    "elvis-kanave.jpg",
    "elvis-presley.jpg",
    "feel- my-lovee-gt.jpg",
    "feel-my-love-gt.jpg",
    "feel-my-ohole.jpg",
    "forever-chris-bron.jpg",
    "hold-my-hand.jpg",
    "hold-my-hand2.jpg",
    "hold-my-hand3.jpg",
    "hold-my-hand4.jpg",
    "hold-my-hand5.jpg",
    "hold-myhand.jpg",
    "if-this-isnt-love-jh.jpg",
    "if-this-isnt-love.jpg",
    "if-this-isnt-ohole.jpg",
    "jennifer-hudson.jpg",
    "latch.jpg",
    "perfect-ed-sheeran.jpg",
    "power-trip-miguel.jpg",
    "power-trip-natango.jpg",
    "power-trippp.jpg",
    "sure-thing.jpg",
    "the-take.jpg",
    "tsoul-best-of-me.jpg"

];


// GENERATE LYRICS GALLERY

if (lyricsGallery) {

    lyricsGallery.innerHTML = "";

    lyricPhotos.forEach((photo, index) => {

        const card = document.createElement("div");

        card.className = "lyrics-card";

        const image = document.createElement("img");

        image.src = `images/${photo}`;
        image.alt = `Our lyrics memory ${index + 1}`;
        image.loading = "lazy";

        card.appendChild(image);

        card.addEventListener("click", () => {
            openImageLightbox(image);
        });

        lyricsGallery.appendChild(card);

    });

}


// =================================
// NAVIGATION TO OUR LYRICS
// =================================

function openLyricsScreen() {

    const lyricsScreen = document.getElementById("lyricsScreen");

    if (!lyricsScreen) return;

    if (memoriesScreen) {
        memoriesScreen.classList.remove("show");
    }

    if (musicScreen) {
        musicScreen.classList.remove("show");
    }

    lyricsScreen.classList.add("show");

    scrollToTop();

}


// =================================
// INSIDE JOKES GALLERY
// TAP A JOKE TO OPEN ITS IMAGE
// =================================

const jokeCards = document.querySelectorAll(".joke-card");

jokeCards.forEach((card) => {

    const image = card.querySelector("img");

    if (!image) return;

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", () => {

        openImageLightbox(image);

    });

    // ALSO ALLOW ENTER AND SPACE TO OPEN

    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            openImageLightbox(image);

        }

    });

});


// =================================
// OPEN INSIDE JOKES PAGE
// =================================

function openInsideJokes() {

    const lyricsScreen = document.getElementById("lyricsScreen");
    const insideJokesScreen = document.getElementById("insideJokesScreen");

    if (!lyricsScreen || !insideJokesScreen) {

        console.error("Lyrics or Inside Jokes screen not found.");

        return;

    }

    lyricsScreen.classList.remove("show");

    insideJokesScreen.classList.add("show");

    scrollToTop();

}


// =================================
// RETURN TO OUR LYRICS
// =================================

function backToLyrics() {

    const lyricsScreen = document.getElementById("lyricsScreen");
    const insideJokesScreen = document.getElementById("insideJokesScreen");

    if (!lyricsScreen || !insideJokesScreen) return;

    insideJokesScreen.classList.remove("show");

    lyricsScreen.classList.add("show");

    scrollToTop();

}

console.log("ETERNALLY JavaScript loaded successfully ♥");
