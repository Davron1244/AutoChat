function sendMessage() {
    const input = document.getElementById("msgInput");
    const msg = input.value.trim();
    if (msg !== "") {
        const chat = document.getElementById("chat");
        const msgDiv = document.createElement("div");
        msgDiv.className = "message from-user";

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const timestamp = `${hours}:${minutes} PM`;

        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";

        const textSpan = document.createElement("span");
        textSpan.className = "text";
        textSpan.innerText = msg;

        const timestampSpan = document.createElement("span");
        timestampSpan.className = "timestamp";
        timestampSpan.innerText = timestamp;

        contentDiv.appendChild(textSpan);
        contentDiv.appendChild(timestampSpan);
        msgDiv.appendChild(contentDiv);

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
        messages.push({ text: msg, from: "user", time: timestamp });
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

        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";

        const textSpan = document.createElement("span");
        textSpan.className = "text";
        textSpan.innerText = msg.text;

        contentDiv.appendChild(textSpan);

        if (msg.time) {
            const timestampSpan = document.createElement("span");
            timestampSpan.className = "timestamp";
            timestampSpan.innerText = msg.time;
            contentDiv.appendChild(timestampSpan);
        }

        msgDiv.appendChild(contentDiv);

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