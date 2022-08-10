const judul = document.querySelector("#inputBookTitle");
const penulis = document.querySelector("#inputBookAuthor");
const thnTerbit = document.querySelector("#inputBookYear");
const isComplete = document.querySelector("#inputBookIsComplete");
const formInput = document.querySelector("#inputBook");
const inputCari = document.querySelector("#searchBookTitle");
const btncari = document.querySelector("#searchSubmit");
const formCari = document.querySelector("#searchBook");
let books = [];

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    books = JSON.parse(localStorage.getItem("books"));
    if (books == null) {
      books = [];
    }
    showBooks(books);
  }
  console.log(books);
});

formInput.addEventListener("submit", function (e) {
  const book = {
    id: `book- ${+new Date()}`,
    judul: judul.value,
    penulis: penulis.value,
    thnTerbit: thnTerbit.value,
    isComplete: isComplete.checked,
  };

  books.push(book);
  saveToStorage(books);
  resetList();
  showBooks(books);
  e.preventDefault();
});

function resetList() {
  document.querySelector("#incompleteBookshelfList").innerHTML = "";
  document.querySelector("#completeBookshelfList").innerHTML = "";
  judul.value = "";
  penulis.value = "";
  thnTerbit.value = "";
}

function showBooks(item) {
  item.forEach(function (book) {
    if (book.isComplete == false) {
      const blmSelesai = document.querySelector("#incompleteBookshelfList");
      blmSelesai.innerHTML += bookNotFinish(book);
    } else {
      const selesai = document.querySelector("#completeBookshelfList");
      selesai.innerHTML += bookFinish(book);
    }
  });
}

document.addEventListener("click", function (e) {
  if (e.target.id == "btnSelesai") {
    const id = e.target.parentElement.parentElement.id;
    const book = books.find((book) => book.id == id);
    book.isComplete = true;
    resetList();
    localStorage.removeItem("books");
    saveToStorage(books);
    showBooks(books);
  } else if (e.target.id == "btn_blmselesai") {
    const id = e.target.parentElement.parentElement.id;
    const book = books.find((book) => book.id == id);
    book.isComplete = false;
    resetList();
    localStorage.removeItem("books");
    saveToStorage(books);
    showBooks(books);
  } else if (e.target.classList.contains("btn-hapus")) {
    const id = e.target.parentElement.parentElement.id;
    const book = books.find((book) => book.id == id);
    books.splice(findIndex(book), 1);
    resetList();
    localStorage.removeItem("books");
    saveToStorage(books);
    showBooks(books);
  }
});

function findIndex(e) {
  return books.findIndex((book) => book.id == e.id);
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveToStorage(book) {
  localStorage.setItem("books", JSON.stringify(book));
}

function findBook(key) {
  const book = books.filter((book) =>
    book.judul.toLowerCase().includes(key.toLowerCase())
  );
  return book;
}

formCari.addEventListener("submit", function (e) {
  e.preventDefault();
  const key = inputCari.value;
  const caribuku = findBook(key);

  if (caribuku == undefined || caribuku.length == 0) {
    alert("Buku tidak ditemukan, periksa kembali judul buku");
    return;
  } else {
    resetList();
    showBooks(caribuku);
  }
});

function bookNotFinish(e) {
  return `<article class="book_item" id="${e.id}">
  <h3>${e.judul}</h3>
  <p>Penulis: ${e.penulis}</p>
  <p>Tahun: ${e.thnTerbit}</p>

  <div class="action">
    <button class="green" id="btnSelesai">Selesai dibaca</button>
    <button class="red btn-hapus">Hapus buku</button>
  </div>
</article>`;
}

function bookFinish(e) {
  return `<article class="book_item" id="${e.id}">
  <h3>${e.judul}</h3>
  <p>Penulis: ${e.penulis}</p>
  <p>Tahun: ${e.thnTerbit}</p>

  <div class="action">
    <button class="green" id="btn_blmselesai">Belum selesai di Baca</button>
    <button class="red btn-hapus">Hapus buku</button>
  </div>
</article>`;
}
