import {Question} from './question';
import {isValid} from './utils';
import './styles.css';

const $form = document.getElementById('form');
const $input = $form.querySelector('#question-input');
const $btnForm = $form.querySelector('#submit');

window.addEventListener('load', Question.renderList);
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
