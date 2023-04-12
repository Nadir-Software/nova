var moreLink = document.getElementById("more-btn");
var buttonRow = document.getElementById("button-row");
var contentContainer = document.getElementById("content");
var searchButton = document.getElementById("search-btn");
var againLink = document.getElementById("random-btn");
var circle = document.getElementById("circle");

function discern() {
    // Set circle style
    circle.style.animation = "2.5s circle-text infinite";
    
    // Get user query
    var query = document.getElementById("query").value;

    // Sanitise user query
    query = query.toLowerCase().replace(/[^\w\s]|please/g, '').trim();

    // Check for empty query and reload if true
    if (query == "") {
        document.location.href = "index.html"
    }

    // Check if query contains profanity
    fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
            if (data === "true") {
                errorAesthetic();

                console.log("Profanity detected!");
                type("Sorry, I cannot respond to profane queries.");
            }

            else if (query.toLowerCase() == "die" || query.toLowerCase() == "die") {
                errorAesthetic();

                console.log("Threat detected!");
                type("Sorry, I cannot respond to threats.");
            }

            else {
                console.log("Query:", query);

                // Clean up any unused elements
                if (!moreLink.classList.contains("hidden")) {
                    moreLink.classList.add("hidden");
                }

                if (!buttonRow.classList.contains("hidden")) {
                    buttonRow.classList.add("hidden");
                }

                if (!searchButton.classList.contains("hidden")) {
                    searchButton.classList.add("hidden");
                }

                if (!againLink.classList.contains("hidden")) {
                    againLink.classList.add("hidden");
                }


                circle.style.background = "";
                document.getElementById("answer").innerText = "Loading...";

                // Logic
                // Remember user input if asked
                if (query.toLowerCase().replace(/ .*/,'') == "remember") {
                    query = query.replace(/.*\bremember\b|\bthat\b\s*/i, "");
                    localStorage.setItem("remember", query);
                    type("I'll try to remember: " + query);
                }

                if (query.toLowerCase() == "recall") {
                    rememberedInfo = localStorage.getItem("remember") || "You haven't asked me to remember anything.";
                    type(rememberedInfo);
                }

                // Repeat after user
                if (query.toLowerCase().replace(/ .*/,'') == "say") {
                    var processedQuerySay = query.replace("say", "");
                    var processedQuerySay = processedQuerySay.replace("Say", "");
                    type(processedQuerySay)
                }


                // Check for queries regarding Nova, user, or greetings/goodbyes
                if (/who are you/i.test(query) || query.toLowerCase().includes("what are you")) {
                    type("I am Nova, your AI assistant.\nHow may I help you?");
                }

                else if (/who am i/i.test(query)) {
                    type("You are a human interacting with me.\nHow may I help you?");
                }

                else if (query.toLowerCase() == "hello" || query.toLowerCase() == "hi" || /good morning/i.test(query) || /good afternoon/i.test(query) || /good evening/i.test(query)) {
                    type("Hello!\nHow can I help you?");
                }

                else if (/bye/i.test(query)) {
                    var number = Math.floor(Math.random() * 6);
                    
                    if (number == 0) {
                        type("Farewell!");
                    }

                    else if (number == 1) {
                        type("Bye!");
                    }

                    else if (number == 2) {
                        type("Goodbye!");
                    }

                    else if (number == 3) {
                        type("See you!");
                    }

                    else if (number == 4) {
                        type("Au revoir!");
                    }

                    else if (number == 5) {
                        type("Adieu!");
                    }
                }

                else if (/how are you/i.test(query)) {
                    type("As an AI, I do not have emotions or moods.\nHowever if you are talking to me, my files are intact.");
                }



                // Check for timedate requests
                if (/time/i.test(query) && /what/i.test(query)) {
                    document.location.href = "time.html";
                }

                else if (/date/i.test(query) && /what/i.test(query)) {
                    type("The date is " + new Date().toLocaleDateString());
                }



                // Check if the query is an arithmetic problem
                else if (/^\d+(\.\d+)?(\s*[-+\/*\^]\s*\d+(\.\d+)?)+$/.test(query)) {
                    // If the query is an arithmetic problem, replace "^" with "**" and evaluate it
                    query = query.replace(/(\?|\ba\b|\ban\b|\bwhat is\b)/gi, "").trim();
                    const processedQuery = query.replace(/\^/g, "**");
                    var answer = eval(processedQuery);
                    answer = (query + " = " + answer);
                    type(answer);
                }



                // Check if query is asking what something is
                else if (/what is/i.test(query)) {
                    const searchTerm = toTitleCase(query.replace(/(\?|\ba\b|\ban\b|\bwhat is\b|\bthe\b)/gi, "").trim());
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                            answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                        }

                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (moreLink.classList.contains("hidden")) {
                            moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";
                        type(answer);
                    })
                    .catch(error => {
                        console.error(error);
                        const searchTermEncoded = encodeURIComponent(searchTerm);
                        const searchLink = `https://en.wikipedia.org/w/index.php?search=${searchTermEncoded}&title=Special:Search&fulltext=1`;

                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (searchButton.classList.contains("hidden")) {
                            searchButton.classList.remove("hidden");
                        }

                        searchButton.href =searchLink;

                        contentContainer.style.gap = "5vh";
                        
                        type("Sorry, I am not familiar with " + searchTerm + ".");
                    });
                }

                else if ((/what are/i.test(query) || /what was/i.test(query) || /what were/i.test(query)) && !(query.includes("what are you") || query.toLowerCase().includes("what are you"))) {
                    const searchTerm = toTitleCase(query.replace(/(\?|\ba\b|\ban\b|\bwhat are\b|\bthe\b)/gi, "").trim());
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                        answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                        }

                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (moreLink.classList.contains("hidden")) {
                            moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";
                        type(answer);
                    })
                    .catch(error => {
                        console.error(error);
                        const searchTermEncoded = encodeURIComponent(searchTerm);
                        const searchLink = `https://en.wikipedia.org/w/index.php?search=${searchTermEncoded}&title=Special:Search&fulltext=1`;
                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (searchButton.classList.contains("hidden")) {
                            searchButton.classList.remove("hidden");
                        }

                        searchButton.href =searchLink;

                        contentContainer.style.gap = "5vh";
                        type("Sorry, I am not familiar with " + searchTerm + ".");
                    });
                }

                else if (/where is/i.test(query)) {
                    const searchTerm = toTitleCase(query.replace(/(\?|\ba\b|\ban\b|\where is\b|\bthe\b)/gi, "").trim());
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                        answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                        }
                        if (buttonRow.classList.contains("hidden")) {
                                buttonRow.classList.remove("hidden");
                            }

                        if (moreLink.classList.contains("hidden")) {
                            moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";
                        type(answer);
                    })
                    .catch(error => {
                        console.error(error);
                        const searchTermEncoded = encodeURIComponent(searchTerm);
                        const searchLink = `https://en.wikipedia.org/w/index.php?search=${searchTermEncoded}&title=Special:Search&fulltext=1`;
                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (searchButton.classList.contains("hidden")) {
                            searchButton.classList.remove("hidden");
                        }

                        searchButton.href =searchLink;

                        contentContainer.style.gap = "5vh";
                        type("Sorry, I am not familiar with " + searchTerm + ".");
                    });
                }

                else if (/who is/i.test(query)) {
                    const searchTerm = toTitleCase(query.replace(/(\?|\ba\b|\ban\b|\who is\b|\bthe\b)/gi, "").trim());
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                        answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                        }

                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (moreLink.classList.contains("hidden")) {
                            moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";                            
                        type(answer);
                    })
                    .catch(error => {
                        console.error(error);
                        const searchTermEncoded = encodeURIComponent(searchTerm);
                        const searchLink = `https://en.wikipedia.org/w/index.php?search=${searchTermEncoded}&title=Special:Search&fulltext=1`;
                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (searchButton.classList.contains("hidden")) {
                            searchButton.classList.remove("hidden");
                        }

                        searchButton.href =searchLink;

                        contentContainer.style.gap = "5vh";
                        type("Sorry, I am not familiar with " + toTitleCase(searchTerm) + ".");
                    });
                }

                else if (/who was/i.test(query)) {
                    const searchTerm = toTitleCase(query.replace(/(\?|\ba\b|\ban\b|\bwho was\b|\bthe\b)/gi, "").trim());
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                        answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                        }

                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (moreLink.classList.contains("hidden")) {
                            moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";

                        type(answer);
                    })
                    .catch(error => {
                        console.error(error);
                        const searchTermEncoded = encodeURIComponent(searchTerm);
                        const searchLink = `https://en.wikipedia.org/w/index.php?search=${searchTermEncoded}&title=Special:Search&fulltext=1`;
                        if (buttonRow.classList.contains("hidden")) {
                            buttonRow.classList.remove("hidden");
                        }

                        if (searchButton.classList.contains("hidden")) {
                            searchButton.classList.remove("hidden");
                        }

                        searchButton.href =searchLink;

                        contentContainer.style.gap = "5vh";
                        type("Sorry, I am not familiar with " + searchTerm + ".");
                    });
                }



                // Handle definition requests
                else if (/define/i.test(query) || /what does .* mean/i.test(query)) {
                    // Extract the word to be defined from the query
                    const match = query.match(/what does (.*) mean/i) || query.match(/define\s+(.*)/i);
                    if (match) {
                    const word = match[1];
                    
                    // Fetch the definition from the Free Dictionary API
                    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                        .then(response => response.json())
                        .then(data => {
                        // Get the first definition from the API response
                        var definition = data[0].meanings[0].definitions[0].definition;
                        definition = toTitleCase(word) + " means " + definition.toLowerCase();
                    
                        // Set the definition as the innerText of an element with ID of "answer"
                        type(definition);
                        })
                        .catch(error => {
                        console.error(error);
                        type("I'm sorry, but I don't know what " + word + " means.\nIf there is an image to my left, it may provide further insight.");
                        });
                    
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(toTitleCase(word))}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.originalimage && data.originalimage.source) {
                                circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                                circle.style.scale = "125%";
                            }
                        });
                    } else {
                    console.error("No word found in query:", query);
                    }
                }

                // Check for random requests
                else if (query.toLowerCase() == "random") {
                    fetch(`https://en.wikipedia.org/api/rest_v1/page/random/summary`)
                    .then(response => response.json())
                    .then(data => {
                        const maxAnswerLength = 150; // Maximum length of the answer text
                        let answer = data.extract.slice(0, maxAnswerLength);
                        if (answer.length < data.extract.length) {
                        answer += "... ";
                        }

                        if (data.originalimage && data.originalimage.source) {
                            circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                            circle.style.scale = "125%";
                            circle.style.animation = "2.5s circle-text infinite"
                        }
                        
                        if (buttonRow.classList.contains("hidden")) {
                                buttonRow.classList.remove("hidden");
                        }

                        if (moreLink.classList.contains("hidden")) {
                                moreLink.classList.remove("hidden");
                        }

                        moreLink.href = data.content_urls.desktop.page;

                        contentContainer.style.gap = "5vh";

                        if (againLink.classList.contains("hidden")) {
                            againLink.classList.remove("hidden");
                        }

                        type(answer);
                    })
                }
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching from PurgoMalum API:", error);
                        type("Error fetching from PurgoMalum API:", error);
                    });
}

function toTitleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(firstLetter) {
      return firstLetter.toUpperCase();
    });
}

function type(str) {
    const element = document.getElementById("answer");
    element.innerText = ""; // Clear the element's innerText before typing
    var i = 0;
    if (i < str.length) {
        element.innerHTML += str.charAt(i);
        i++;
        setTimeout(type, 10);
    }
}

function random() {
    document.querySelectorAll('.markfordelete').forEach(e => e.remove());
    circle.style.background = "";
    document.getElementById("answer").innerText = "Loading...";
    document.getElementById("query").value = "";

    fetch(`https://en.wikipedia.org/api/rest_v1/page/random/summary`)
        .then(response => response.json())
        .then(data => {
            const maxAnswerLength = 150; // Maximum length of the answer text
            let answer = data.extract.slice(0, maxAnswerLength);
            if (answer.length < data.extract.length) {
            answer += "... ";
            }

            if (data.originalimage && data.originalimage.source) {
                circle.style.backgroundImage = "url('" + data.originalimage.source + "')";
                circle.style.scale = "125%";
            }

            if (buttonRow.classList.contains("hidden")) {
                buttonRow.classList.remove("hidden");
            }

            if (moreLink.classList.contains("hidden")) {
                    moreLink.classList.remove("hidden");
            }

            moreLink.href = data.content_urls.desktop.page;

            contentContainer.style.gap = "5vh";

            if (againLink.classList.contains("hidden")) {
                againLink.classList.remove("hidden");
            }

            type(answer);
        })
}

function errorAesthetic() {
    circle.classList.remove("circle");
    circle.style.animation = "2.5s circle-error infinite";
    circle.classList.add("circle-error");
}