function sendMessage() {
    const input = document.getElementById("msgInput");
    const msg = input.value.trim();
    if (msg !== "") {
        const chat = document.getElementById("chat");
        const msgDiv = document.createElement("div");
        msgDiv.className = "message from-user";
        msgDiv.innerText = msg;

        const deleteBtn = document.createElement("div");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function() {
            msgDiv.remove();
            let messages = JSON.parse(localStorage.getItem("MessageChat")) || [];
            const index = messages.findIndex(m => m.text === msg && m.from === "user");
            if (index !== -1) {
                messages.splice(index, 1);
                localStorage.setItem("MessageChat", JSON.stringify(messages));
            }
        };

        deleteBtn.style.display = "none";

        msgDiv.addEventListener("click", function() {
            deleteBtn.style.display = deleteBtn.style.display === "none" ? "block" : "none";
        });

        msgDiv.appendChild(deleteBtn);
        chat.appendChild(msgDiv);
        chat.scrollTop = chat.scrollHeight;

        let messages = JSON.parse(localStorage.getItem("MessageChat")) || [];
        messages.push({ text: msg, from: "user" });
        localStorage.setItem("MessageChat", JSON.stringify(messages));

        input.value = "";

        setTimeout(() => input.focus(), 0);
    }
}

function loadMessages() {
    const chat = document.getElementById("chat");
    const messages = JSON.parse(localStorage.getItem("MessageChat")) || [];

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
                let allMsgs = JSON.parse(localStorage.getItem("MessageChat")) || [];
                const index = allMsgs.findIndex(m => m.text === msg.text && m.from === "user");
                if (index !== -1) {
                    allMsgs.splice(index, 1);
                    localStorage.setItem("MessageChat", JSON.stringify(allMsgs));
                }
            };

            deleteBtn.style.display = "none";

            msgDiv.addEventListener("click", function() {
                deleteBtn.style.display = deleteBtn.style.display === "none" ? "block" : "none";
            });

            msgDiv.appendChild(deleteBtn);
        }

        chat.appendChild(msgDiv);
    });

    chat.scrollTop = chat.scrollHeight;
}

window.addEventListener("DOMContentLoaded", () => {
    loadMessages();

    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        document.body.classList.add("dark");
    }

    document.querySelectorAll('.contact-firstname, .contact-lastname').forEach(function(el) {
        const originalText = el.textContent;
        const length = originalText.length;

        if (length > 13) {
            el.textContent = originalText.slice(0, 13) + '...';
            el.style.fontSize = "18px";
        }
    });
});

window.addEventListener("load", function() {
    setTimeout(function() {
        const loading = document.getElementById("loading");
        if (loading) {
            loading.style.display = "none";
        }
    }, 1000);
});

const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("send-btn");

input.addEventListener("input", () => {
    sendBtn.disabled = input.value.trim().length < 1;
});

const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const msgInput = document.getElementById("msgInput");

emojiBtn.addEventListener("click", () => {
    emojiBtn.classList.toggle("active");
    emojiPanel.style.display = emojiPanel.style.display === "none" ? "flex" : "none";
});

function insertEmoji(emoji) {
    msgInput.value += emoji;
    setTimeout(() => msgInput.focus(), 0);
}
