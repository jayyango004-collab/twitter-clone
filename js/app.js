//==================================================
// X CLONE
// PART 1
// Tweet Posting + Character Counter
//==================================================

const tweetText = document.getElementById("tweetText");
const postBtn = document.getElementById("postBtn");
const tweetFeed = document.getElementById("tweetFeed");

// -----------------------------
// Character Counter
// -----------------------------

const counter = document.createElement("span");

counter.id = "charCounter";
counter.style.color = "#71767b";
counter.style.fontSize = "14px";
counter.style.marginRight = "15px";

const tweetBottom = document.querySelector(".tweet-bottom");

tweetBottom.insertBefore(counter, postBtn);

function updateCounter(){

    const remaining = 280 - tweetText.value.length;

    counter.textContent = remaining;

    if(remaining <= 20){

        counter.style.color = "#f91880";

    }else{

        counter.style.color = "#71767b";

    }

    postBtn.disabled = tweetText.value.trim() === "";

}

updateCounter();

tweetText.addEventListener("input", updateCounter);

// -----------------------------
// Create Tweet
// -----------------------------

postBtn.addEventListener("click", () => {

    const text = tweetText.value.trim();

    const timestamp = Date.now();

    if(text === "") return;

    const tweet = document.createElement("article");

    tweet.className = "tweet";

    tweet.innerHTML = `

<img
src="https://res.cloudinary.com/ds4yx5h6d/image/upload/v1780265473/IMG_20260126_215911_bbchfp.jpg"
class="profile-img">

<div class="tweet-content">

<div class="tweet-top">

<div class="tweet-user">

<strong>Jael</strong>

<i class="bi bi-patch-check-fill verified"></i>

<span>@jaeldev · <span class="time"></span></span>

</div>

<i class="bi bi-three-dots"></i>

</div>

<p>${text}</p>

<div class="tweet-icons">

<div class="icon reply">
<i class="bi bi-chat"></i>
<span>0</span>
</div>

<div class="icon repost">
<i class="bi bi-repeat"></i>
<span>0</span>
</div>

<div class="icon like">
<i class="bi bi-heart"></i>
<span>0</span>
</div>

<div class="icon views">
<i class="bi bi-bar-chart"></i>
<span>1</span>
</div>

<div class="icon bookmark">
<i class="bi bi-bookmark"></i>
</div>

<div class="icon share">
<i class="bi bi-upload"></i>
</div>

</div>

</div>

`;

   setInterval(() => {

    document.querySelectorAll(".time").forEach(el => {

        const time = Number(el.dataset.time);

        if (time) {
            el.textContent = formatTime(time);
        }

    });

}, 30000);

//==================================================
// X CLONE
// PART 2
// Like • Bookmark • Follow • Share
//==================================================

function setupTweetButtons(parent = document){

    // -----------------------------
    // LIKE
    // -----------------------------

    parent.querySelectorAll(".like").forEach(btn=>{

        if(btn.dataset.ready) return;

        btn.dataset.ready="true";

        btn.addEventListener("click",()=>{

            btn.classList.toggle("active");

            const icon=btn.querySelector("i");
            const count=btn.querySelector("span");

            if(icon){

                icon.classList.toggle("bi-heart");
                icon.classList.toggle("bi-heart-fill");

            }

            if(count){

                let value=parseInt(count.textContent.replace("K",""))||0;

                if(btn.classList.contains("active")){

                    value++;

                }else{

                    value--;

                    if(value<0)value=0;

                }

                count.textContent=value;

            }

        });

    });

    // -----------------------------
    // BOOKMARK
    // -----------------------------

    parent.querySelectorAll(".bookmark").forEach(btn=>{

        if(btn.dataset.ready) return;

        btn.dataset.ready="true";

        btn.addEventListener("click",()=>{

            btn.classList.toggle("active");

            const icon=btn.querySelector("i");

            if(icon){

                icon.classList.toggle("bi-bookmark");
                icon.classList.toggle("bi-bookmark-fill");

            }

        });

    });

    // -----------------------------
    // REPOST
    // -----------------------------

    parent.querySelectorAll(".repost").forEach(btn=>{

        if(btn.dataset.ready) return;

        btn.dataset.ready="true";

        btn.addEventListener("click",()=>{

            btn.classList.toggle("active");

            const count=btn.querySelector("span");

            if(count){

                let value=parseInt(count.textContent.replace("K",""))||0;

                if(btn.classList.contains("active")){

                    value++;

                    btn.style.color="#00ba7c";

                }else{

                    value--;

                    if(value<0)value=0;

                    btn.style.color="";

                }

                count.textContent=value;

            }

        });

    });

    // -----------------------------
    // SHARE
    // -----------------------------

    parent.querySelectorAll(".share").forEach(btn=>{

        if(btn.dataset.ready) return;

        btn.dataset.ready="true";

        btn.addEventListener("click",()=>{

            navigator.clipboard.writeText(window.location.href);

            alert("Link copied!");

        });

    });

}

/* activate buttons already on page */

setupTweetButtons();

//==================================================
// FOLLOW BUTTONS
//==================================================

document.querySelectorAll(".follow-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        if(button.textContent==="Follow"){

            button.textContent="Following";

            button.classList.add("following");

        }else{

            button.textContent="Follow";

            button.classList.remove("following");

        }

    });

});

//==================================================
// X CLONE
// PART 3
// Dark Mode + Local Storage + Shortcuts
//==================================================

// -----------------------------
// Load Saved Tweets
// -----------------------------

window.addEventListener("DOMContentLoaded",()=>{

    const savedTweets=JSON.parse(localStorage.getItem("tweets"))||[];

    savedTweets.reverse().forEach(item => {

        const tweet=document.createElement("article");

        tweet.className="tweet";

        tweet.innerHTML=`

<img src="https://res.cloudinary.com/ds4yx5h6d/image/upload/v1780265473/IMG_20260126_215911_bbchfp.jpg" class="profile-img">

<div class="tweet-content">

<div class="tweet-top">

<div class="tweet-user">

<strong>Jael</strong>

<i class="bi bi-patch-check-fill verified"></i>

<span>@jaeldev · <span class="time"></span></span>

</div>

<i class="bi bi-three-dots"></i>

</div>

<p>${item.text}</p>

<div class="tweet-icons">

<div class="icon reply">
<i class="bi bi-chat"></i>
<span>0</span>
</div>

<div class="icon repost">
<i class="bi bi-repeat"></i>
<span>0</span>
</div>

<div class="icon like">
<i class="bi bi-heart"></i>
<span>0</span>
</div>

<div class="icon views">
<i class="bi bi-bar-chart"></i>
<span>1</span>
</div>

<div class="icon bookmark">
<i class="bi bi-bookmark"></i>
</div>

<div class="icon share">
<i class="bi bi-upload"></i>
</div>

</div>

</div>

`;

      tweetFeed.prepend(tweet);

const timeEl = tweet.querySelector(".time");

if (timeEl) {
    timeEl.dataset.time = item.time;
    timeEl.textContent = formatTime(item.time);
}

setupTweetButtons(tweet); 

    });

});

// -----------------------------
// Save New Tweets
// -----------------------------

postBtn.addEventListener("click",()=>{

    const text=tweetText.value.trim();

    if(text==="") return;

    const tweets=JSON.parse(localStorage.getItem("tweets"))||[];

    tweets.push({
    text: text,
    time: Date.now()
});

    localStorage.setItem("tweets",JSON.stringify(tweets));

});

// -----------------------------
// Ctrl + Enter to Post
// -----------------------------

tweetText.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="Enter"){

        postBtn.click();

    }

});

// -----------------------------
// Dark / Light Mode
// -----------------------------

const themeBtn = document.createElement("button");

themeBtn.className = "post-btn";
themeBtn.style.marginTop = "12px";

document.querySelector(".sidebar-top").appendChild(themeBtn);

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeBtn.textContent = "🌙";
} else {
    themeBtn.textContent = "☀️";
}

// Toggle theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";
    }

});

// -----------------------------
// Auto Resize Textarea
// -----------------------------

tweetText.addEventListener("input",()=>{

    tweetText.style.height="auto";

    tweetText.style.height=tweetText.scrollHeight+"px";

});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const tweets = document.querySelectorAll(".tweet");

    tweets.forEach(tweet => {
        const text = tweet.textContent.toLowerCase();
        tweet.style.display = text.includes(value) ? "block" : "none";
    });
});


// -----------------------------
// Format Timestamp
// -----------------------------

function formatTime(ms) {

    const seconds = Math.floor((Date.now() - ms) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);

    return `${days}d`;

}

const times = document.querySelectorAll(".time");

if (times.length >= 2) {

    // OpenAI tweet posted 2 hours ago
    const openAI = Date.now() - (2 * 60 * 60 * 1000);

    times[0].dataset.time = openAI;
    times[0].textContent = formatTime(openAI);

    // Nature tweet posted 4 hours ago
    const nature = Date.now() - (4 * 60 * 60 * 1000);

    times[1].dataset.time = nature;
    times[1].textContent = formatTime(nature);

}

tweetFeed.prepend(tweet);

const timeEl = tweet.querySelector(".time");

if (timeEl) {
    timeEl.dataset.time = timestamp;
    timeEl.textContent = formatTime(timestamp);
}

tweetText.value = "";

updateCounter();

setupTweetButtons(tweet);

});

// -----------------------------
// Console Message
// -----------------------------

console.log("✅ X Clone Loaded Successfully");

