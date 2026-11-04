const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');
const addBookmarkBtn = document.getElementById('add-bookmark-button');
const categoryNameForm = document.querySelectorAll('.category-name');
const categoryOption = document.getElementById('category-dropdown');
const closeFormBtn = document.getElementById('close-form-button');
const addBookmarkBtnForm = document.getElementById('add-bookmark-button-form');
const viewCategoryBtn = document.getElementById('view-category-button');
const categoryList = document.getElementById('category-list');
const closeListBtn = document.getElementById('close-list-button');
const delBookmarkBtn = document.getElementById('delete-bookmark-button');
const bookmarkName = document.getElementById("name");
const bookmarkURL = document.getElementById("url");

const getBookmarks = () => {
    try {
        const parsedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        if (Array.isArray(parsedBookmarks) && parsedBookmarks.every(item =>
            item.hasOwnProperty('name') &&
            item.hasOwnProperty('category') &&
            item.hasOwnProperty('url')
        )) return parsedBookmarks;

        return [];
    } catch {
        return [];
    }
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

const displayOrHideCategory = () => {
    mainSection.classList.toggle('hidden');
    bookmarkListSection.classList.toggle('hidden');
}

const getSelectedCategoryName = () => {
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

    return isEmpty, nodeList;
}

const cleanFormInputs = (formId) => {
    const nodeList = document.getElementById(formId).querySelectorAll("input[type='text']");

    for (const node of nodeList) {
        node.value = "";
    };
}

const fillBookmarkList = () => {
    categoryList.innerHTML = "";
    const selectedCategory = getSelectedCategoryName();

    categoryNameForm.forEach(node => {
        node.innerText = selectedCategory;
    });

    const filteredBookmark = getBookmarks().filter(bm => bm.category === categoryOption.value);

    if (filteredBookmark.length === 0) {
        categoryList.innerHTML =
            '<p>No Bookmarks Found</p>';
    }

    filteredBookmark.forEach(({ name, category, url }) => {
        categoryList.innerHTML +=
            `<div>
            <input type="radio" name="bookmarks" id="${name}" value="${name}">
            <label for="${name}"><a href="${url}">${name}</a></label>
        </div>`;
    })
}

viewCategoryBtn.addEventListener('click', () => {
    displayOrHideCategory();
    fillBookmarkList();
});

addBookmarkBtn.addEventListener('click', () => {
    categoryNameForm.forEach(node => {
        node.innerText = getSelectedCategoryName();
    });

    displayOrCloseForm();
});

closeFormBtn.addEventListener('click', () => {
    displayOrCloseForm();
});

addBookmarkBtnForm.addEventListener('click', () => {
    const isEmpty = validateEmptyInputs('form-section');    

    if (isEmpty) {
        alert('Revise los campos vacíos.');
        return;
    };

    currentBookmarks.name = bookmarkName.value;
    currentBookmarks.category = categoryOption.value;
    currentBookmarks.url = bookmarkURL.value;

    bookmarks.push(currentBookmarks);

    setBookmarks(bookmarks);

    cleanFormInputs('form-section');

    displayOrCloseForm();
});

closeListBtn.addEventListener('click', () => {
    displayOrHideCategory();
});

delBookmarkBtn.addEventListener('click', () => {
    const radioInputs = document.querySelectorAll('input[type="radio"]');

    for (const radio of radioInputs) {
        if (radio.checked) {
            const index = bookmarks.findIndex(bm => bm.name === radio.value && bm.category === categoryOption.value);
            bookmarks.splice(index, 1);
            setBookmarks(bookmarks);
            fillBookmarkList();

            break;
        }
    }
});