// Xabar yuborish funksiyasi
function sendMessage() {
    const input = document.getElementById("msgInput");
    const msg = input.value.trim();
    if (msg !== "") {
        const chat = document.getElementById("chat");
        const msgDiv = document.createElement("div");
        msgDiv.className = "message from-user";
        msgDiv.innerText = msg;
        chat.appendChild(msgDiv);
        chat.scrollTop = chat.scrollHeight;

        let messages = JSON.parse(localStorage.getItem("ChatMsg")) || [];
        messages.push({ text: msg, from: "user" });
        localStorage.setItem("ChatMsg", JSON.stringify(messages));

        input.value = "";
        document.getElementById("send-btn").disabled = true;
    }
}

// Xabarlarni yuklab berish
function loadMessages() {
    const chat = document.getElementById("chat");
    const messages = JSON.parse(localStorage.getItem("ChatMsg")) || [];
    messages.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message from-${msg.from}`;
        msgDiv.innerText = msg.text;
        chat.appendChild(msgDiv);
    });
    chat.scrollTop = chat.scrollHeight;
}

// Sahifa yuklanganda:
window.addEventListener("DOMContentLoaded", () => {
    loadMessages();

    // Dark mode
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        document.body.classList.add("dark");
    }

    // Ism uzunligini tekshirish
    document.querySelectorAll('.contact-firstname, .contact-lastname').forEach(function(el) {
        const originalText = el.textContent;
        const length = originalText.length;

        if (length > 13) {
            el.textContent = originalText.slice(0, 13) + '...';
            el.style.fontSize = "18px";
        }
    });
});

// Yuklanish animatsiyasi
window.addEventListener("load", function() {
    setTimeout(function() {
        const loading = document.getElementById("loading");
        if (loading) {
            loading.style.display = "none";
        }
    }, 1000);
});

// Input bo‘sh bo‘lsa, yuborish tugmasi o‘chadi
const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("send-btn");

input.addEventListener("input", () => {
    if (input.value.trim().length >= 1) {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
});


//Sticker 

const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const msgInput = document.getElementById("msgInput");

// Emoji tugmasi bosilganda panelni ko‘rsatish/yopish
emojiBtn.addEventListener("click", () => {
    emojiPanel.style.display = emojiPanel.style.display === "none" ? "flex" : "none";
});

// Emoji ni inputga qo‘shish
function insertEmoji(emoji) {
    msgInput.value += emoji;
    msgInput.focus();
}

// delet message

function sendMessage() {
    const input = document.getElementById("msgInput");
    const msg = input.value.trim();
    if (msg !== "") {
        const chat = document.getElementById("chat");
        const msgDiv = document.createElement("div");
        msgDiv.className = "message from-user";
        msgDiv.innerText = msg;
        // DELETE tugmasi
        const deleteBtn = document.createElement("div");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function() {
            msgDiv.remove();

            let messages = JSON.parse(localStorage.getItem("ChatMsg")) || [];
            const index = messages.findIndex(m => m.text === msg && m.from === "user");
            if (index !== -1) {
                messages.splice(index, 1);
                localStorage.setItem("ChatMsg", JSON.stringify(messages));
            }
        };

        deleteBtn.style.display = "none";

        msgDiv.addEventListener("click", function() {
            if (deleteBtn.style.display === "none") {
                deleteBtn.style.display = "block";
            } else {
                deleteBtn.style.display = "none";
            }
        });

        msgDiv.appendChild(deleteBtn);
        chat.appendChild(msgDiv);
        chat.scrollTop = chat.scrollHeight;

        let messages = JSON.parse(localStorage.getItem("ChatMsg")) || [];
        messages.push({ text: msg, from: "user" });
        localStorage.setItem("ChatMsg", JSON.stringify(messages));

        input.value = "";
        document.getElementById("send-btn").disabled = true;
    }
}

function loadMessages() {
    const chat = document.getElementById("chat");
    const messages = JSON.parse(localStorage.getItem("ChatMsg")) || [];

    messages.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message from-${msg.from}`;
        msgDiv.innerText = msg.text;

        if (msg.from === "user") {
            const deleteBtn = document.createElement("div");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerText = "Delete";

            deleteBtn.onclick = function() {
                msgDiv.remove();

                let allMsgs = JSON.parse(localStorage.getItem("ChatMsg")) || [];
                const index = allMsgs.findIndex(m => m.text === msg.text && m.from === "user");
                if (index !== -1) {
                    allMsgs.splice(index, 1);
                    localStorage.setItem("ChatMsg", JSON.stringify(allMsgs));
                }
            };

            msgDiv.appendChild(deleteBtn);
        }

        chat.appendChild(msgDiv);
    });

    chat.scrollTop = chat.scrollHeight;
}