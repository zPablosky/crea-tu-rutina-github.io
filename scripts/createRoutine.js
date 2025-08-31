function viewContainerCreateRoutine() {
    const containerCraeteRoutine = document.querySelector('#secCreateRoutine');
    const containerPresentCraeteRoutine = document.querySelector('.presentContainerCreateRoutineInterfaz');
    const createRoutineButton = document.querySelector('.createRoutineButton');
    const closeContainerCreateRoutine = document.querySelector('.closeContainerCreateRoutine');

    containerCraeteRoutine.classList.add('textDisplayNone');

    createRoutineButton.addEventListener('click', () => {
        containerCraeteRoutine.classList.remove('textDisplayNone');
        containerPresentCraeteRoutine.classList.add('ocultar');
    });

    closeContainerCreateRoutine.addEventListener('click', () => {
        containerCraeteRoutine.classList.add('textDisplayNone');
        containerPresentCraeteRoutine.classList.remove('ocultar');
    });
}

viewContainerCreateRoutine();

let selectDay = [];
let day;

// alc_DatesRoutine ya no es necesaria con el nuevo enfoque.
// Los datos se guardarán directamente del alc_ApiRoutine.
let alc_ApiRoutine = {
    name: '',
    days: [],
    exersiesByDay: {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
    },
};

const daysSelectRoutine = document.querySelectorAll('.daysSelect');
const textSelectsExerciesContainer = document.querySelector('.textSelectsExerciesContainer');
const containeMyrCreateRoutine = document.querySelectorAll('.containeMyCreateRoutine');
const $containerSavesRoutine = document.querySelector('.containerSavesRoutineOfUser');
const containerNoHayRoutines = document.querySelector('.wrrapperNoSavedRoutines');
const containerSavesRoutineTheUser = document.querySelector('.savesRoutineTheUser');


containeMyrCreateRoutine.forEach((container) => {
    container.style.display = 'none';
});
    
textSelectsExerciesContainer.classList.remove('textDisplayNone');

function verificarLosContenedores(i) {
    const verificarBotones = Array.from(daysSelectRoutine).some(d => d.classList.contains('selectDaysButton'));

    if (verificarBotones) {
        containeMyrCreateRoutine[i].style.display = 'block';
        textSelectsExerciesContainer.classList.add('textDisplayNone');
    } else {
        containeMyrCreateRoutine[i].style.display = 'none';
        textSelectsExerciesContainer.classList.remove('textDisplayNone');
    }
}

for (let i = 0; i < daysSelectRoutine.length; i++) {
    daysSelectRoutine[i].addEventListener('click', () => {
        daysSelectRoutine[i].classList.toggle('selectDaysButton');
        verificarLosContenedores(i);
        day = daysSelectRoutine[i].textContent.toLowerCase().trim();
        
        const index = selectDay.indexOf(day);
        
        if (index === -1) {
            selectDay.push(day);
            alc_ApiRoutine.days.push(day);
        } else {
            selectDay.splice(index, 1);
            alc_ApiRoutine.days.splice(alc_ApiRoutine.days.indexOf(day), 1);
        }
    });
}

function activeButtonCreateRoutine() {
    const $buttonAgreeExercies = document.querySelectorAll('.buttonAgreeExersiesRoutine');
    const $containerTableAgreeExersiesRoutine = document.querySelectorAll('.containerTableAgreeExersiesRoutine');

    $containerTableAgreeExersiesRoutine.forEach((container) => {
        container.classList.add('containerTableNone');
    });

    for (let i = 0; i < $buttonAgreeExercies.length; i++) {
        $buttonAgreeExercies[i].addEventListener('click', () => {
            $containerTableAgreeExersiesRoutine.forEach((container) => {
                container.style.display = 'block';
            });
            getTheDaysData(i);
            createElementsExersiesTable(i);
        });
    }
}

function getTheDaysData(i) {
    const $inputNameOfRoutine = document.querySelector('#inputAgreeNameOfRoutine');
    const $inputNameExersies = document.querySelectorAll('.inputNameExersies');
    const $inputSeriesExersies = document.querySelectorAll('.inputSeriesExersies');
    const $inputRepeatExersies = document.querySelectorAll('.inputRepeatExersies');
    const $inputIntervalExersies = document.querySelectorAll('.inputIntervalExersies');
    const $inputAgreeWeight = document.querySelectorAll('.inputAgreeWeight');

    const agreeDatesOfInputs = {
        nameOfRoutine: $inputNameOfRoutine.value,
        nameExersies: $inputNameExersies[i].value,
        seriesExersies: parseInt($inputSeriesExersies[i].value),
        repeatExersies: parseInt($inputRepeatExersies[i].value),
        intervalExersies: parseInt($inputIntervalExersies[i].value),
        weightExersies:  $inputAgreeWeight[i].value
    };

    if (day) {
        alc_ApiRoutine.name = $inputNameOfRoutine.value;
        alc_ApiRoutine.exersiesByDay[day].push(agreeDatesOfInputs);
        
        // No se reinician los inputs aquí para permitir añadir más ejercicios al mismo día.
        // Se reiniciarán al guardar la rutina completa.
    }
}

function createElementsExersiesTable(i) {
    const $containerTableAgreeExersiesRoutine = document.querySelectorAll('.containerTableAgreeExersiesRoutine');
    const $tableContainerAgreeDates = document.querySelectorAll('.tableContainerAgreeDates');
    
    const dayName = daysSelectRoutine[i].textContent.toLowerCase().trim();
    const lastExercise = alc_ApiRoutine.exersiesByDay[dayName].slice(-1)[0];

    if (!lastExercise) return;
    
    const $containerTable = document.createElement('div');
    $containerTable.classList.add('tableInfo');
    
    $containerTable.innerHTML = `
        <div class="tableInfoRoutineName"><span>${lastExercise.nameExersies}</span></div>
        <div class="tableInfoRoutineSeries tableInfoRoutine"><span>${lastExercise.seriesExersies}</span></div>
        <div class="tableInfoRoutineRepeat tableInfoRoutine"><span>${lastExercise.repeatExersies}</span></div>
        <div class="tableInfoRoutineInterval tableInfoRoutine"><span>${lastExercise.intervalExersies}</span></div>
        <div class="tableInfoRoutineWeight tableInfoRoutine"><span>${lastExercise.weightExersies || '-'}</span></div>
    `;

    $tableContainerAgreeDates[i].appendChild($containerTable);
    $containerTableAgreeExersiesRoutine[i].classList.remove('containerTableNone');
}

// **Nueva función para guardar en localStorage**
function saveRoutineToLocalStorage(routine) {
    const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    savedRoutines.push(routine);
    localStorage.setItem('routines', JSON.stringify(savedRoutines));
}

// **Nueva función para crear un modal por rutina**
function createRoutineModal(routine, routineIndex) {
    const existingModal = document.getElementById(`modal-${routineIndex}`);
    if (existingModal) return;

    const modal = document.createElement('div');
    modal.classList.add('containerViewRoutine', 'contaierViewRoutineDisplay');
    modal.id = `modal-${routineIndex}`;

    modal.innerHTML = `
        <div class="wrrapperContainerViewRoutine">
            <nav>
                <button class="closeContainerViewRoutine" data-modal-index="${routineIndex}">
                    <i class="ri-arrow-left-line"></i> Volver Atras
                </button>
            </nav>
            <header class="headerCotnainerViewRoutine">
                <span>${routine.name || 'Rutina personalizada'}</span>
                Tu Rutina personalizada está lista
            </header>
            <section class="containerTableViewRoutine"></section>
        </div>
    `;

    const sectionTable = modal.querySelector('.containerTableViewRoutine');

    routine.days.forEach(day => {
        const exercisesForDay = routine.exersiesByDay[day];
        if (exercisesForDay && exercisesForDay.length > 0) {
            const dayWrapper = document.createElement('div');
            dayWrapper.classList.add('dayRoutineWrapper');

            const dayTitle = document.createElement('button');
            dayTitle.classList.add('headerButtonDay')
            dayTitle.textContent = day.charAt(0).toUpperCase() + day.slice(1);
            dayWrapper.appendChild(dayTitle);

            const tableHeader = document.createElement('header');
            tableHeader.classList.add('headerTableContainerView');
            tableHeader.innerHTML = `
                <div class="infoTableRoutineView"><span>Ejercicio</span></div>
                <div class="infoTableRoutineView"><span>Series</span></div>
                <div class="infoTableRoutineView"><span>Repeticiones</span></div>
                <div class="infoTableRoutineView"><span>Descanso</span></div>
                <div class="infoTableRoutineView"><span>Peso</span></div>
            `;
            dayWrapper.appendChild(tableHeader);

            exercisesForDay.forEach(exercise => {
                const row = document.createElement('div');
                row.classList.add('tableViewContainerRoutine');
                row.innerHTML = `
                    <div class="tableItemsInfoRoutineView">
                        <div class="itemTableViewInfo"><span>${exercise.nameExersies || '-'}</span></div>
                        <div class="itemTableViewInfo"><span>${exercise.seriesExersies || '-'}</span></div>
                        <div class="itemTableViewInfo"><span>${exercise.repeatExersies || '-'}</span></div>
                        <div class="itemTableViewInfo"><span>${exercise.intervalExersies || '-'}</span></div>
                        <div class="itemTableViewInfo"><span>${exercise.weightExersies || '-'}</span></div>
                    </div>
                `;
                dayWrapper.appendChild(row);
            });
            sectionTable.appendChild(dayWrapper);
        }
    });

    document.querySelector('.containerBodyViewRoutine').appendChild(modal);

    modal.querySelector('.closeContainerViewRoutine').addEventListener('click', () => {
        modal.classList.add('contaierViewRoutineDisplay');
    });
}

function renderSavedRoutines() {
    const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    
    $containerSavesRoutine.innerHTML = '';
    const existingModals = document.querySelectorAll('.containerViewRoutine');
    existingModals.forEach(modal => modal.remove());

    if (savedRoutines.length > 0) {
        containerNoHayRoutines.style.display = 'none'
        containerSavesRoutineTheUser.classList.remove('viewCardRoutineDisplay');
        savedRoutines.forEach((routine, index) => {
            const exercisesTotal = Object.values(routine.exersiesByDay).flat().length;
            const seriesTotal = Object.values(routine.exersiesByDay).flat().reduce((total, ex) => total + ex.seriesExersies, 0);
            const minutesTotal = Object.values(routine.exersiesByDay).flat().reduce((total, ex) => total + (ex.intervalExersies * ex.seriesExersies), 0) / 60;

            const cardRoutine = `
                <div class="wrraperRoutineCreate">
                    <div class="headerRoutine">
                        <span>${routine.name || 'Rutina sin nombre'}</span>
                        <p>Creada: ${new Date().toLocaleDateString()}</p>
                    </div>
                    <div class="infoRoutine">
                        <div class="itemInfo">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 14H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 8H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${routine.days.length}</span>
                            Dias/Semana
                        </div>
                        <div class="itemInfo">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 14H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 8H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${exercisesTotal}</span>
                            Ejercicios
                        </div>
                        <div class="itemInfo">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 14H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 8H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${seriesTotal}</span>
                            Series Totales
                        </div>
                        <div class="itemInfo">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 14H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 8H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 3V5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${minutesTotal.toFixed(1)}</span>
                            Min/dia
                        </div>
                    </div>
                    <div class="containerOptionsRoutine">
                        <button class="buttonViewRoutine" data-routine-index="${index}">
                            <i class="ri-eye-line"></i> Ver Mas
                        </button>
                        <button class="deleteRoutineButton" data-routine-index="${index}">
                            <i class="ri-delete-bin-line"></i> Eliminar
                        </button>
                    </div>
                </div>
            `;
            $containerSavesRoutine.insertAdjacentHTML('beforeend', cardRoutine);
            createRoutineModal(routine, index);
        });
    } else {
        containerNoHayRoutines.style.display = 'block';
        containerSavesRoutineTheUser.classList.add('viewCardRoutineDisplay');
    }

    attachEventListenersToCards();
}

function attachEventListenersToCards() {
    const viewButtons = document.querySelectorAll('.buttonViewRoutine');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.routineIndex;
            const modal = document.getElementById(`modal-${index}`);
            if (modal) {
                modal.classList.remove('contaierViewRoutineDisplay');
            }
        });
    });

    const deleteButtons = document.querySelectorAll('.deleteRoutineButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.routineIndex);
            deleteRoutineFromLocalStorage(index);
        });
    });
}

function deleteRoutineFromLocalStorage(index) {
    let savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    if (index >= 0 && index < savedRoutines.length) {
        savedRoutines.splice(index, 1);
        localStorage.setItem('routines', JSON.stringify(savedRoutines));
        const modalToRemove = document.getElementById(`modal-${index}`);
        if (modalToRemove) {
            modalToRemove.remove();
        }
        renderSavedRoutines();
    }
}

function createCardOfRoutine() {
    const $buttonSavesRoutine = document.querySelector('#saveRoutineUser');

    $buttonSavesRoutine.addEventListener('click', () => {
        const nameRoutine = document.querySelector('#inputAgreeNameOfRoutine').value;
        if (!nameRoutine || alc_ApiRoutine.days.length === 0) {
            alert('Por favor, ingresa un nombre para la rutina y selecciona al menos un día.');
            return;
        }

        const newRoutine = {
            name: nameRoutine,
            days: [...alc_ApiRoutine.days],
            exersiesByDay: JSON.parse(JSON.stringify(alc_ApiRoutine.exersiesByDay))
        };

        saveRoutineToLocalStorage(newRoutine);
        resetValuesTables();
        resetApiRoutine();
        renderSavedRoutines();
    });
}

// **Función para reiniciar el estado de la API de rutina**
function resetApiRoutine() {
    alc_ApiRoutine = {
        name: '',
        days: [],
        exersiesByDay: {
            lunes: [],
            martes: [],
            miercoles: [],
            jueves: [],
            viernes: [],
            sabado: [],
            domingo: [],
        },
    };
    selectDay = [];
    day = null;
    const daysSelectRoutine = document.querySelectorAll('.daysSelect');
    daysSelectRoutine.forEach(d => d.classList.remove('selectDaysButton'));
    const allTableInfos = document.querySelectorAll('.tableInfo');
    allTableInfos.forEach(el => el.remove());
    document.querySelector('#inputAgreeNameOfRoutine').value = '';
    
    // Ocultar los contenedores de días si no hay días seleccionados
    containeMyrCreateRoutine.forEach((container) => {
        container.style.display = 'none';
    });
    textSelectsExerciesContainer.classList.remove('textDisplayNone');

}

function resetValuesTables() {
    const tableAgreeExercies = document.querySelectorAll('.containerTableAgreeExersiesRoutine');
    tableAgreeExercies.forEach((container) => {
        container.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSavedRoutines(); // Cargar y mostrar rutinas al inicio
    createCardOfRoutine();
    activeButtonCreateRoutine();
});