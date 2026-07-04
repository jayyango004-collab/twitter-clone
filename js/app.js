// ==========================
// Tweet Functionality
// ==========================

const postBtn = document.getElementById("postBtn");
const tweetText = document.getElementById("tweetText");
const tweetFeed = document.getElementById("tweetFeed");

postBtn.addEventListener("click", () => {

    const text = tweetText.value.trim();

    if (text === "") {
        alert("Please write something!");
        return;
    }

    const tweet = document.createElement("div");

    tweet.className = "tweet";

    tweet.innerHTML = `
        <img src="assets/profile.jpg" alt="Profile">

        <div class="tweet-content">

            <h3>Jael <span>@jaeldev · Now</span></h3>

            <p>${text}</p>

            <div class="tweet-icons">
                <i class="fa-regular fa-comment"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-chart-simple"></i>
                <i class="fa-solid fa-share"></i>
            </div>

        </div>
    `;

    tweetFeed.prepend(tweet);

    tweetText.value = "";

});


// ==========================
// Dark Mode Toggle
// ==========================

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌞 Light Mode";
} else {
    themeToggle.textContent = "🌙 Dark Mode";
}

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌞 Light Mode";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙 Dark Mode";
    }

});
