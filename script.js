window.onload = function() {
    nextBird();
    document.getElementById('guess_real').addEventListener('click', guessReal);
    document.getElementById('guess_fake').addEventListener('click', guessFake);
}

function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function nextBird() {
    setRandomBird();
    showBird();
}

lastBirdIndex = -1;
currentBirdIndex = -1;
currentBird = null;

function getRandomIndex() {
    var index = Math.floor(Math.random() * birds.length);
    if (index == lastBirdIndex) {
        return getRandomIndex();
    }
    return index;
}

function setRandomBird() {
    var index = getRandomIndex();
    lastBirdIndex = currentBirdIndex;
    currentBirdIndex = index;
    currentBird = birds[index];
    console.log(index)
    console.log(currentBird)
}

function showBird() {
    console.log("showing bird");
    hide = ["answer_right", "answer_wrong", "answer_real", "answer_fake", "next"];
    show = ["answer_none", "guess_real", "guess_fake"];
    for (var i = 0; i < hide.length; i++) {
        hideElement(hide[i]);
    }
    for (var i = 0; i < show.length; i++) {
        showElement(show[i]);
    }
    var name = Math.random() < 0.5 ? currentBird.dutch_name : currentBird.latin_name;
    document.getElementById('bird_name').innerHTML = name;
    if (currentBird.real) {
        document.getElementById('bird_image').src = currentBird.picture;
        showElement('bird_image');
        document.getElementById('bird_url').href = currentBird.url;
        showElement('bird_url');
    } else {
        hideElement('bird_image');
        hideElement('bird_url');
    }
    document.getElementById('guess').style.display = 'flex';
}

function guessReal() {
    console.log('guessing real');
    showAnswer(true);
}

function guessFake() {
    console.log('guessing fake');
    showAnswer(false);
}

function showAnswer(real) {
    var right = currentBird.real == real;
    if (right) {
        showElement('answer_right');
    } else {
        showElement('answer_wrong');
    }
    if (currentBird.real) {
        showElement('answer_real');
    } else {
        showElement('answer_fake');
    }
    showElement('next');

    hide = ["guess", "answer_none", "guess_real", "guess_fake"];
    for (var i = 0; i < hide.length; i++) {
        hideElement(hide[i]);
    }
}