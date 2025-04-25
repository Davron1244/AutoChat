document.getElementById("camera-input").addEventListener("change", function (e) {
    var file = e.target.files[0]; 
    if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
            document.getElementById("profile-img").src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
document.getElementById("camera-input").addEventListener("change", function (e) {
    var file = e.target.files[0]; 
    if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
            localStorage.setItem("profileImage", event.target.result);
            document.getElementById("profile-img").src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});

window.onload = function () {
    var savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        document.getElementById("profile-img").src = savedImage;
    }
};






function setActive(btn) {
    const chatsBtn = document.querySelector('#Chats')
const contactsBtn = document.querySelector('#Contacts')
const browserBtn = document.querySelector('#Browser')
    if (btn === 'chat') {
        chatsBtn.classList.add('active')
        contactsBtn.classList.remove('active')
        browserBtn.classList.remove('active')
        window.location.href = "index.html"
    } else if (btn === 'contact') {
        chatsBtn.classList.remove('active')
        contactsBtn.classList.add('active')
        browserBtn.classList.remove('active')
        window.location.href = "contacts.html"
    } else if (btn === 'browser') {
        chatsBtn.classList.remove('active')
        contactsBtn.classList.remove('active')
        browserBtn.classList.add('active')
        window.location.href = "browser.html"
    }
}
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark ? 'on' : 'off');
}

window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'on') {
    document.body.classList.add('dark');
  }
});






window.addEventListener('load', function() {
    setTimeout(function() {
      const loading = document.getElementById('loading');
      const content = document.getElementById('content');
      loading.style.display = 'none';
    }, 1000);
  });
  



const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});





  const input = document.querySelector('.input-search');

  const placeholders = ["Qidiruv...", "Поиск...", "Search..."];
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typePlaceholder() {
    const currentText = placeholders[currentIndex];
    const visibleText = currentText.slice(0, charIndex);
  
    if (input.value === "") {
      input.setAttribute("placeholder", visibleText);
    }
  
    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typePlaceholder, 1500); 
        return;
      } else {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % placeholders.length;
      }
    }
  
    setTimeout(typePlaceholder, isDeleting ? 100 : 150);
  }
  
  typePlaceholder();
  




// dark funksya
  window.addEventListener("DOMContentLoaded", () => {

    const darkMode = localStorage.getItem("darkMode") === "true";
    let modeIcon = document.getElementById("modeIcon")
    if (darkMode) {
    
      document.body.classList.add("dark");
    }
      
  });
