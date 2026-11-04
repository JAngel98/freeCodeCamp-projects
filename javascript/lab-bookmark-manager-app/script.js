const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const addBookmarkBtn = document.getElementById('add-bookmark-button');
const categoryNameForm = document.querySelectorAll('.category-name');
const categoryOption = document.getElementById('category-dropdown');
const closeFormBtn = document.getElementById('close-form-button');
const addBookmarkBtnForm = document.getElementById('add-bookmark-button-form');

const getBookmarks = () => {
    return localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
}

const setBookmarks = (array) => {
    localStorage.setItem('bookmarks', JSON.stringify(array));
}

const bookmarks = getBookmarks();
const currentBookmarks = {}

const displayOrCloseForm = () => {
    mainSection.classList.toggle('hidden');
    formSection.classList.toggle('hidden');
}

const getSelectedCategory = () => {
    return categoryOption.selectedOptions[0].innerText;
}

const validateEmptyInputs = (formId) => {
    const nodeList = document.getElementById(formId).querySelectorAll("input[type='text']");
    let isEmpty = false;

    for (const node of nodeList) {
        if (node.value.trim() === "") {
            isEmpty = true;
            break;
        };
    };

    return { isEmpty, nodeList };
}

const cleanFormInputs = (formId) => {
    const nodeList = document.getElementById(formId).querySelectorAll("input[type='text']");

    for (const node of nodeList) {
        node.value = "";
    };
}

addBookmarkBtn.addEventListener('click', () => {
    categoryNameForm.forEach(node => {
        node.innerText = getSelectedCategory();
    });

    displayOrCloseForm();
});

closeFormBtn.addEventListener('click', () => {
    displayOrCloseForm();
});

addBookmarkBtnForm.addEventListener('click', () => {
    const { isEmpty, nodeList } = validateEmptyInputs('form-section');

    if (isEmpty) {
        alert('Revise los campos vacíos.');
        return;
    };

    currentBookmarks.name = nodeList[0].value;
    currentBookmarks.category = getSelectedCategory();
    currentBookmarks.url = nodeList[1].value;

    bookmarks.push(currentBookmarks);

    setBookmarks(bookmarks);

    cleanFormInputs('form-section');

    displayOrCloseForm();

    // console.log(bookmarks);


});



// document.getElementById('test').addEventListener('click', () => {
//     displayOrCloseForm();
// });