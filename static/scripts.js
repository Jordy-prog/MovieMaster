function showDropdown() {
    let menu = document.getElementById("account");
    menu.classList.toggle("d-flex-col");
    let arrow = document.getElementById("dropdown_arrow");
    arrow.classList.toggle("rotate");
}

function showModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "block";
}

function hideModal(id) {
    let modal = document.getElementById(id);
    modal.style.display = "none";
}

function replyToComment(el) {
    let original_card = el.closest(".card");
    let original_text = original_card.children[1].children[0].innerText;

    let original_comment = document.getElementById("original_comment");
    original_comment.innerText = original_text;
    showModal('replyModal');
}

function showReplies(el) {
    let section = el.closest(".comment-section");
    let replies = section.children[1];

    if (replies.style.display === "grid") {
        replies.style.display = "none";
    } else {
        replies.style.display = "grid";
    }
}

function favouriteActor(el) {
    el.classList.toggle("fa-star-o");
    el.classList.toggle("fa-star");
}

function likeList(el) {
    if (el.classList.contains("text-highlight")) {
        el.classList.remove("text-highlight");
    } else {
        let parent = el.parentElement;

        for (child of parent.children) {
            if (child.classList.contains("fa")) {
                child.classList.remove("text-highlight");
            }
        }

        el.classList.add("text-highlight");
    }
}

function followList(el) {
    el.classList.toggle("pressed");
    
    if (el.innerText === "Follow") {
        el.innerText = "Unfollow";
    } else {
        el.innerText = "Follow";
    }
}

function addFriend(el) {
    el.classList.toggle("pressed");

    if (el.innerText === "Add friend!") {
        el.innerText = "Remove friend";
    } else {
        el.innerText = "Add friend!";
    }
}

// Querying OMDB API
var form = document.getElementById("search-movies");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    queryOMDB();
})

async function queryOMDB() {
    let value = encodeURIComponent(document.getElementById("search-box").value);
    let query = "https://www.omdbapi.com/?type=movie&s=" + value + "&apikey=2cc42e3e"

    let fetchData = {
        method: 'GET',
    }

    const response = await fetch(query, fetchData);
    let data = await response.json();

    // Clear results div
    let resultsDiv = document.getElementById("movie_results");
    resultsDiv.innerHTML = "";

    if (data.Response === 'True') {
        resultsDiv.style.display = "grid";

        for (movie of data.Search) {
            // Create elements
            let wrappingAnchor = document.createElement('a');
            let movieCard = document.createElement('div');
            let movieImg = document.createElement('img');
            let movieTitleFooter = {
                div: document.createElement('div'),
                header: document.createElement('h2'),
            }

            // Setup movie title
            movieTitleFooter.header.innerText = movie.Title;
            movieTitleFooter.div.appendChild(movieTitleFooter.header);
            movieTitleFooter.div.classList.add("card-footer");

            // Setup image
            if (movie.Poster === "N/A") {
                movieImg.src = "static/default_poster.jpg";
            } else {
                movieImg.src = movie.Poster;
            }

            movieImg.classList.add("card-image");

            // Setup card
            movieCard.appendChild(movieImg);
            movieCard.appendChild(movieTitleFooter.div);
            movieCard.classList.add("card")
            
            wrappingAnchor.href = "movie.html";
            wrappingAnchor.classList.add("zoom");
            wrappingAnchor.appendChild(movieCard);
            resultsDiv.appendChild(wrappingAnchor);
        }
    } else {
        resultsDiv.style.display = "block";
        let header = document.createElement('h2');
        header.classList.add("shadow");
        header.innerText = "No results!";
        resultsDiv.appendChild(header);
    }

}