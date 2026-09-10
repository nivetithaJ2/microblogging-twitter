// CHANGE SECTION
function showSection(sectionId, button) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
}


// CREATE POST
function postTweet() {

    const input = document.getElementById("tweetInput");

    const text = input.value.trim();

    if (text === "") {
        alert("Please write something first!");
        return;
    }

    const posts = document.getElementById("posts");

    const newPost = document.createElement("article");

    newPost.className = "tweet";

    newPost.innerHTML = `
        <div class="avatar">SP</div>

        <div class="tweet-content">

            <div class="tweet-header">
                <strong>Sathya Priya Raj Kumar</strong>
                <span>@sathyapriya · just now</span>
            </div>

            <p>${escapeHTML(text)}</p>

            <div class="tweet-actions">

                <button onclick="comment(this)">
                    <i class="fa-regular fa-comment"></i>
                    <span>0</span>
                </button>

                <button onclick="repost(this)">
                    <i class="fa-solid fa-retweet"></i>
                    <span>0</span>
                </button>

                <button onclick="like(this)">
                    <i class="fa-regular fa-heart"></i>
                    <span>0</span>
                </button>

                <button onclick="bookmark(this)">
                    <i class="fa-regular fa-bookmark"></i>
                </button>

            </div>

            <div class="comment-box">

                <input type="text"
                       placeholder="Write a comment...">

                <button onclick="addComment(this)">
                    Comment
                </button>

            </div>

        </div>
    `;

    posts.prepend(newPost);

    input.value = "";

    updateCharacterCount();

    updatePostCount();
}


// LIKE
function like(button) {

    const icon = button.querySelector("i");

    const count = button.querySelector("span");

    let number = parseInt(count.textContent);

    if (button.classList.contains("liked")) {

        number--;

        button.classList.remove("liked");

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

    } else {

        number++;

        button.classList.add("liked");

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");
    }

    count.textContent = number;
}


// COMMENT
function comment(button) {

    const count = button.querySelector("span");

    count.textContent = parseInt(count.textContent) + 1;
}


// ADD COMMENT
function addComment(button) {

    const input = button.previousElementSibling;

    const text = input.value.trim();

    if (text === "") {
        alert("Please write a comment.");
        return;
    }

    alert("Comment added: " + text);

    input.value = "";
}


// REPOST
function repost(button) {

    const count = button.querySelector("span");

    count.textContent = parseInt(count.textContent) + 1;

    alert("Post reposted successfully!");
}


// BOOKMARK
function bookmark(button) {

    const icon = button.querySelector("i");

    if (icon.classList.contains("fa-regular")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        alert("Post bookmarked!");

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        alert("Bookmark removed!");
    }
}


// FOLLOW
function followUser(button) {

    if (button.textContent.trim() === "Follow") {

        button.textContent = "Following";

        button.classList.add("following");

    } else {

        button.textContent = "Follow";

        button.classList.remove("following");
    }
}


// MESSAGE
function sendMessage() {

    const input = document.getElementById("messageInput");

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const container = document.getElementById("sentMessages");

    const message = document.createElement("div");

    message.className = "message sent";

    message.textContent = text;

    container.appendChild(message);

    input.value = "";
}


// CREATE POST BUTTON
function focusPost() {

    showSection(
        "home",
        document.querySelector(".nav-item")
    );

    document.getElementById("tweetInput").focus();
}


// CHARACTER COUNT
const tweetInput = document.getElementById("tweetInput");

if (tweetInput) {

    tweetInput.addEventListener("input", updateCharacterCount);
}

function updateCharacterCount() {

    const input = document.getElementById("tweetInput");

    const counter = document.getElementById("charCount");

    counter.textContent = input.value.length + "/280";
}


// POST COUNT
function updatePostCount() {

    const posts = document.querySelectorAll("#posts .tweet");

    document.getElementById("postCount").textContent = posts.length;
}


// CLEAR NOTIFICATIONS
function clearNotifications() {

    const list = document.getElementById("notificationList");

    list.innerHTML = `
        <div class="notification">
            <div class="notification-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <div>
                <strong>Connectly</strong>
                <p>No new notifications.</p>
            </div>
        </div>
    `;
}


// SEARCH TOPICS
function searchTopics(input) {

    const search = input.value.toLowerCase();

    const topics = document.querySelectorAll(".topic");

    topics.forEach(topic => {

        const text = topic.textContent.toLowerCase();

        if (text.includes(search)) {
            topic.style.display = "flex";
        } else {
            topic.style.display = "none";
        }

    });
}


// EDIT PROFILE
function editProfile() {

    const newName = prompt(
        "Enter your name:",
        "Sathya Priya Raj Kumar"
    );

    if (newName && newName.trim() !== "") {

        document.querySelector(".profile-container h1").textContent =
            newName;

        document.querySelector(".sidebar-profile strong").textContent =
            newName;
    }
}


// SECURITY FOR USER POST
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}