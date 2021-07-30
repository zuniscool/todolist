(function () {
    'use strict'
    const input = document.querySelector('.modal__input');
    const formInput = document.querySelector('.form__input');
    const lists = document.querySelector('.lists');
    
    const TODOS_LS = 'toDos';
    const COMPLETED_TODOS_LS = 'completedToDos';
    const USER_NAME_LS = 'userName';
    const loadedUserName = localStorage.getItem(USER_NAME_LS);
    let toDos = [];
    let completedToDos = [];

    // inital arrays for Local Stroage
    function initalArrays() {
        const initialArray1 = JSON.stringify(toDos);
        const initialArray2 = JSON.stringify(completedToDos);
        localStorage.setItem(TODOS_LS, initialArray1);
        localStorage.setItem(COMPLETED_TODOS_LS, initialArray2);
    }

    // submit User Name.
    // relate the function 'loadUserName'.
    function userNameInput() {
        const currentValue = formInput.value;
        localStorage.setItem(USER_NAME_LS, currentValue);
        initalArrays();
    }

    // load 'saved user name' from Local Storage.
    // relate the function 'userNameInput'.
    function loadUserName() {
        const nameContainer = document.querySelector('.name_container');
        const mainContainer = document.querySelector('.main_container');
        if (loadedUserName !== null) {
            const messageGreeting = document.querySelector('.message__greeting_user');
            messageGreeting.textContent = `안녕하세요. ${loadedUserName} 님`;
            nameContainer.classList.add('display-yn');
            mainContainer.classList.remove('display-yn');
        }
    }

    // output the todolist number.
    function checkNumber() {
        const loadArray = localStorage.getItem(TODOS_LS)
        const arrayLength = JSON.parse(loadArray).length;
        const messageToDo = document.querySelector('.message__todo_number');
        if (arrayLength == 0) {
            messageToDo.textContent = `오늘의 할 일을 등록하세요.`;
        } else {
            messageToDo.textContent = `오늘의 할 일은 ${arrayLength}개 입니다.`;
        }
    }
    
    // on/off modal inputter.
    function onOffModal() {
        const bgModal = document.querySelector('.bg-modal');
        const modal = document.querySelector('.modal');
        
        bgModal.classList.toggle('display-yn');
        modal.classList.toggle('display-yn');
    
        input.focus();
    }
    
    // add each todolist for array & save.
    // relate the function 'createList', 'submitToDo'.
    let targetId = 1;
    function onAdd(value, todosName, array) {
        lists.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});

        if (todosName == 'toDos') {
            createList(value);
            const toDoObj = {
                value: value,
                id: toDos.length + 1
            }
            toDos.push(toDoObj);
        } else if (todosName == 'completedToDos') {
            createList(value, 'checkbox');
            const completedToDoObj = {
                value: value,
                id: completedToDos.length + 1
            }
            completedToDos.push(completedToDoObj);
        }
    
        saveToDos(todosName, array);
    }

    // list creator
    // relate the function 'onAdd', 'submitToDo'.
    function createList(value, target) {
    if (target == 'checkbox') {
        lists.innerHTML += `<li class="list checked_list" id=${targetId}>
            <input class="checkbox" type="checkbox" data-target-id=${targetId} style="visibility:hidden;">
            <span class="value">${value}</span>
        </li>`;
    } else {
        lists.innerHTML += `<li class="list" id=${targetId}>
            <input class="checkbox" type="checkbox" data-target-id=${targetId}>
            <span class="value">${value}</span>
            <button class="btn-del">
                <i class="fas fa-trash" data-target-id=${targetId}></i>
            </button>
        </li>`;
    }
    targetId++; // set serial number in list
    input.value = '';
    }

    // change status to checklists.
    // if you have clicked 'checkbox', the checklist change to array 'completedToDos'.
    function handleCheckedList(event) {
        const checkbox = event.target;
        if (checkbox.className == 'checkbox') {
            const targetListValue = checkbox.nextElementSibling.textContent;

            createList(targetListValue, checkbox.className);
            onAdd(targetListValue, COMPLETED_TODOS_LS, completedToDos);
            saveToDos(COMPLETED_TODOS_LS, completedToDos);
            location.reload();
        }
    }
    
    // submit text & deliver text to fn:onAdd.
    // relate the function 'onAdd', 'creataList'.
    function submitToDos(event) {
        const submitKey = event.key;
        const submitBtn = event.pointerId;
        let inputedText = input.value;
        const textLength = inputedText.length;
    
        if (inputedText == '') {
            return;
        } else if (textLength > 23) {
            alert('24자 이하로 작성하세요.');
            return input.value = '';
        }
    
        if (submitKey == 'Enter' || submitBtn == 1 || event.type == 'touchstart') {
            onAdd(inputedText, TODOS_LS, toDos);
            checkNumber();
            onOffModal();
        }
    }
    
    // save todolists in user local storage.
    function saveToDos(todosName, array) {
        localStorage.setItem(todosName, JSON.stringify(array));
    }
    
    // load todolists from user local storage.
    function loadToDos() {
        const loadedToDos1 = localStorage.getItem(TODOS_LS);
        const loadedToDos2 = localStorage.getItem(COMPLETED_TODOS_LS);
        const parsedToDos1 = JSON.parse(loadedToDos1);
        const parsedToDos2 = JSON.parse(loadedToDos2);
        
        if (parsedToDos1 !== '' || parsedToDos2 !== '') {
            parsedToDos1.forEach(toDo => {
                onAdd(toDo.value, TODOS_LS, toDos);
            });
            parsedToDos2.forEach(toDo => {
                onAdd(toDo.value, COMPLETED_TODOS_LS, completedToDos);
            });
        }

        if (loadedToDos2 !== '[]') {
            document.querySelector('.btn-del-completed_list').classList.remove('display-yn');
        } else {
            document.querySelector('.btn-del-completed_list').classList.add('display-yn');
        }
    }
    
    // check the clicked type whether 'btn-del' or 'checkbox'.
    // relate the 'deleteToDo' function.
    function checkOrDel(event) {
        if (event.path[1].className == 'btn-del') { // click btn-del
            const deleteTarget = event.target;
            const deleteList = deleteTarget.parentNode.parentNode;
            deleteToDo(deleteTarget, deleteList)
        } else if (event.path[0].className == 'checkbox') { // click checkbox
            const checkTarget = event.target;
            const checkList = checkTarget.parentNode;
            deleteToDo(checkTarget, checkList);
        }
    }

    // delete each todolist in user local storage & update todolists.
    // relate the 'checkOrDel' function.
    function deleteToDo(targetBtn, targetList) {
        if (targetBtn.dataset.targetId == targetList.id) {
            const updateToDos = toDos.filter(toDo => {
                return toDo.id !== parseInt(targetList.id);
            });
            toDos = updateToDos;
            saveToDos(TODOS_LS, toDos);
            location.reload();
        }
    }

    // delete completed lists.
    function completedListDelete() {
        completedToDos = [];
        saveToDos(COMPLETED_TODOS_LS, completedToDos);
        location.reload(); // bring data from Cache;
    }

    // initialize
    function init() {
        const btnAdd = document.querySelector('.btn-add');
        const btnSumbit = document.querySelector('.modal__btn-submit');
        const btnCancel = document.querySelector('.btn-cancel');
        const btnCompletedList = document.querySelector('.btn-del-completed_list');
        const nameForm = document.querySelector('.form-user_name');

        // event handler
        const complListDel = btnCompletedList.addEventListener('click', completedListDelete);
        const deleteEvent = addEventListener('click', event => checkOrDel(event));
        const btnInput = btnSumbit.addEventListener('click', event => submitToDos(event));
        const btnInputTouch = btnSumbit.addEventListener('touchstart', event => submitToDos(event));
        const keyInput = addEventListener('keydown', event => submitToDos(event));
        const checked = addEventListener('click', event => handleCheckedList(event));
        const submitUserName = nameForm.addEventListener('submit', userNameInput);
    
        // modal handler
        btnAdd.addEventListener('click', onOffModal);
        btnCancel.addEventListener('click', onOffModal);
    
        // output the data
        loadToDos();
        loadUserName();
        checkNumber();
    }

    init();
}());