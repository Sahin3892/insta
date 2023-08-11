let posts = [
  // Ein leeres Array für die Posts
];
// Hinzufügen der Posts aus dem LocalStorage
if (localStorage.getItem("posts")) {
  posts = JSON.parse(localStorage.getItem("posts"));
}
// Erstellt die Seite indem auf den DIV mit der ID content zugreift
function render() {
  let content = document.getElementById("content");
  // Löscht alles aus der Webseite
  content.innerHTML = "";

  content.innerHTML = /*html*/ `
  <div class="nav-bar" id="nav-bar">
    <div class="header"> <img class="insta-icon" src="src/icons/insta.ico" alt="">
    <h1 class="hide-mobile" >Insta</h1>
    </div>
    <div class="create-container"><img src="src/icons/start.ico" alt=""> <p class="hide-mobile"> Startseite</p></div>
    <div class="create-container"><img src="src/icons/search.ico" alt=""> <p class="hide-mobile"> Suche</p></div>
    <div class="create-container"><img src="src/icons/compass.ico" alt=""> <p class="hide-mobile"> Entdecken</p></div>
    <div class="create-container"><img src="src/icons/reel.ico" alt=""> <p class="hide-mobile"> Reels</p></div>
    <div class="create-container"><img src="src/icons/arrow.ico" alt=""><p class="hide-mobile">  Nachrichten</p></div>
    <div class="create-container"><img src="src/icons/heart.ico" alt=""> <p class="hide-mobile"> Benachrichtigung</p></div>
    <div class="create-container">
    <img onclick="newPost()" src="src/icons/plus.ico" alt="">
    <p class="hide-mobile" onclick="newPost()">Erstellen</p>
    </div>
    <div class="create-container"><p class="hide-mobile">Profil</p></div>
</div>
  `;
  // Schleife wird durchlaufen und HTML Code Generiert
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    content.innerHTML += /*html*/ `
      <div class="contents">
        <h2>${post.author}</h2>
        <img class="img-posts" src="${post.image}" alt="">
        <div>
          <ul>
            ${post.comments
              .map(
                (
                  comment,
                  commentIndex // Arrow Funktion ist eine alternative kompakte Syntax für die Erstellung von Funktionen in Javascript
                ) => /*html*/ `
              <li class="deleteComment">${comment}<img src="src/icons/delete.ico" alt="" onclick="deleteComment(${i})"> </li>
            `
              )
              .join("")}
          </ul>
        </div> <!-- Fügen Kommentare hinzu in einer Liste -->
        <div class="addComment">
          <input id="commentId${i}" type="text" placeholder="Kommentieren">
          <img src="src/icons/comment.ico" alt="" onclick="newComment(${i})"> <!-- Übergeben den Index des aktuellen Posts -->
          <img src="src/icons/delete.ico" alt="" onclick="deletePost(${i})"> <!-- Neuer Button zum Löschen des Posts -->
        </div>
      </div>
    `;
  }
}

// In dieser Funktion wird die Kommentar funktion erstellt
function newComment(postIndex) {
  let commentInput = document.getElementById(`commentId${postIndex}`);
  let commentValue = commentInput.value;

  if (commentValue == "") {
    alert("Kein Kommentar vorhanden"); // Wenn kein Kommentar Vorhanden ist wird ein Alert ausgelöst mit einer Benachrichtigung
  } else {
    if (!posts[postIndex].comments) {
      posts[postIndex].comments = [];
    }
    posts[postIndex].comments.push(commentValue);
  }

  commentInput.value = "";
  localStorage.setItem("posts", JSON.stringify(posts));
  render();
}

// In dieser Funktion wird ein neuer Post erstellt
function newPost() {
  let author = prompt("Autor:"); // Der User wird nach dem Autor Namen gefragt
  if (author) {
    let input = document.createElement("input"); // Hier wird ein input TAG erstellt
    input.type = "file"; // Der Input TAG erhält den TYP file
    input.accept = "image/*";
    input.onchange = function (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (event) {
        let image = event.target.result;
        if (image) {
          let post = {
            author: author,
            image: image,
            comments: [], // Jeder neue Post hat ein leeres Array für Kommentare
          };

          posts.push(post);

          localStorage.setItem("posts", JSON.stringify(posts));

          render();
        } else {
          alert("Fehler beim Lesen der Datei.");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  } else {
    alert("Bitte gib einen Autor an!");
  }
}

// In dieser Funktion können die Posts gelöscht werden
function deletePost(postIndex) {
  if (confirm("Beitrag Löschen ?")) {
    posts.splice(postIndex, 1); // Entferne den Post aus dem Array
    localStorage.setItem("posts", JSON.stringify(posts));
    render();
  }
}

// Funktion um Kommentare zu löschen
function deleteComment(postIndex, commentIndex) {
  if (confirm("Kommentar Löschen ?")) {
    posts[postIndex].comments.splice(commentIndex, 1);
    localStorage.setItem("posts", JSON.stringify(posts));

    render();
  }
}
