import {Question} from './question';
import {isValid, createModal} from './utils';
import {getAuthForm, authWithEmailAndPassword} from './auth';
import './styles.css';

const $form = document.getElementById('form');
const $modalBtn = document.getElementById('modal-btn');
const $input = $form.querySelector('#question-input');
const $btnForm = $form.querySelector('#submit');

window.addEventListener('load', Question.renderList);
$modalBtn.addEventListener('click', openModal);
$form.addEventListener('submit', submitFormHandler);
$input.addEventListener('input', () => {
    $btnForm.disabled = !isValid($input.value);
});

function submitFormHandler(event) {
    event.preventDefault();

    if(isValid($input.value)) {
        const question = {
            text: $input.value.trim(),
            date: new Date().toJSON()
        };
        
        $btnForm.disabled = true;
        //Запрос на сервер для сохранения вопроса
        Question.create(question).then(() => {
            $input.value = '';
            $input.className = '';
            $btnForm.disabled = false;
        });
    }
}

 function openModal() {
    createModal('Авторизация', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const btn = event.target.querySelector('button');
    const password = event.target.querySelector('#password').value;

    btn.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string') {
        createModal('Ошибка', content);
    } else {
        createModal('Список вопросов', Question.listToHTML(content));
    }
}




