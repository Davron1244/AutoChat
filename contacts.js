let contacts = JSON.parse(localStorage.getItem("Contactlar")) || [
    { id: 1, firstName: "Bektemir", lastName: "Tumani", image: "./img/  .svg" },
    { id: 2, firstName: "Chilonzor", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 3, firstName: "Mirobod", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 4, firstName: "Mirzo Ulug‘bek", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 5, firstName: "Olmazor", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 6, firstName: "Sergeli", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 7, firstName: "Shayxontohur", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 8, firstName: "Uchtepa", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 9, firstName: "Yakkasaroy", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 10, firstName: "Yashnobod", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 11, firstName: "Yunusobod", lastName: "Tumani", image: "./img/fakeava.svg" },
    { id: 12, firstName: "Yangihayot", lastName: "Tumani", image: "./img/fakeava.svg" }
];

console.log(contacts);

const container = document.querySelector(".contacts-container");
const searchInput = document.querySelector(".input-search");

function render(contactList = contacts) {
    container.innerHTML = "";
    contactList.forEach(e => {
        container.innerHTML += `
      <div class="swiper myContactSwiper">
        <div class="swiper-wrapper swiper-flex">
          <div class="swiper-slide call-contact">
            <button class="call-btn" onclick="location.href='call.html'">
              <i class="fa-solid fa-phone"></i>
            </button>
            <button class="videoCall-btn" onclick="location.href='VideoCall.html'">
              <i class="fa-solid fa-video"></i>
            </button>
          </div>
          <div class="swiper-slide contact">
            <div class="flex-contact">
              <button class="contact-btn" onclick="location.href='chat.html'">
                <img src="${e.image}" alt="Contact.ava" class="contact-ava">
<div class="on-btn"></div>

              </button>

              <button class="contact-btn" onclick="location.href='./chat.html'">
                <div class="flex-contact">
                  <h1 class="contact-name" id="title">${e.firstName} ${e.lastName} <br><br></h1>
                  
                  <p style="display: none;" class="contact-online-time"><br> Oxirgi Marta 9:40da onlayn edi</p>
                  <p  class="contact-online-time"> <br> Yaqinda onlayn edi</p>
  <p style="display: none;" class="contact-online-time"> <br>Kecha onlayn edi</p>
  <p style="display: none;" class="contact-online-time"> <br>Bir  hafta oldin onlayn edi</p>
  <p style="display: none;" class="contact-online-time"> <br> Bir oy oldin onlayn edi</p>
  <p style="display: none;" class="contact-online-time"> <br>uzoq vaqt kirmagan</p>
                </div>
              </button>
            </div>
          </div>
          <div class="swiper-slide delete-contact">
            <button class="contact-profile-btn"><i class="fa-solid fa-bars"></i></button>
            <button class="contact-mute-btn"><i class="fa-solid fa-bell-slash"></i></button>
            <button onclick="OpenDialog(${e.id})" id="openDialog"><i id="delete-contact-icon" class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
      <div id="overlay${e.id}" class="overlay">
        <div class="dialogBox">
          <h1>Bu chat butunlay oʻchirilsinmi?</h1>
          <p class="DialogSorov">Bu nafaqat oxirgi xabarlarni emas, <span><br>"${e.firstName} ${e.lastName}"<br></span> bilan barcha yozishmalaringiz o'chib ketadi!</p>
          <div class="buttons">
            <button onclick="closeDialog(${e.id})" class="cancel">Ortga</button>
            <button onclick="deleteContact(${e.id})" class="delete">O'chirilsin</button>
          </div>
        </div>
      </div>
    `;
    });

    reinitAllSwipers();
}

function OpenDialog(id) {
    const overlay = document.getElementById(`overlay${id}`);
    if (overlay) overlay.style.display = 'flex';
}

function closeDialog(id) {
    const overlay = document.getElementById(`overlay${id}`);
    if (overlay) overlay.style.display = 'none';
}

function deleteContact(id) {
    const index = contacts.findIndex(contact => contact.id == id);
    if (index !== -1) {
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        render();
    }
}

function reinitAllSwipers() {
    const swipers = document.querySelectorAll('.myContactSwiper');

    swipers.forEach(swiperEl => {
        const swiper = new Swiper(swiperEl, {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: -450,
            threshold: 100,
        });

        swiperEl.swiper = swiper;

        swiperEl.addEventListener("touchend", () => {
            clearTimeout(swiper.timer);
            swiper.timer = setTimeout(() => {
                swiper.slideTo(1);
            }, 15000);
        });
    });
}

function handleSearch() {
    const value = searchInput.value.toLowerCase().trim();
    const filteredContacts = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(value) ||
        contact.lastName.toLowerCase().includes(value)
    );
    render(filteredContacts);
}

searchInput.addEventListener("input", handleSearch);

searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        handleSearch();
    }
});

render();

const searchInp = document.getElementById('search');
const contactNotFound = document.querySelectorAll('.contacts-container');
const noResults = document.getElementById('not-found');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    let found = false;

    contactNotFound.forEach(contact => {
        if (contact.textContent.toLowerCase().includes(searchText)) {
            contact.style.display = 'list-item';
            found = true;
        } else {
            contact.style.display = 'none';
        }
    });

    noResults.style.display = found ? 'none' : 'block';
});


window.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        document.body.classList.add("dark");
    }
});