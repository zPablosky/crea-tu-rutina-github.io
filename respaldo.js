//Primera Copia

const $wrapperModal = document.createElement('div');
       $wrapperModal.classList.add('wrapperContainerTableViewRoutine');

       const $headerModal = document.createElement('header');
       const $headerTittle = document.createElement('button');
       const $sectionTable = document.createElement('article');
       const $sectionHeaderTable = document.createElement('header');

       $sectionTable.classList.add('containerRoutineView');
       $sectionHeaderTable.classList.add('headerTableContainerView');

       $headerTittle.textContent = day.charAt(0).toUpperCase() + day.slice(1)

       $sectionHeaderTable.innerHTML = `
            <div class="infoTableRoutineView">
                <span>Ejercicio</span>
            </div>
            <div class="infoTableRoutineView">
                <span>Series</span>
            </div>
            <div class="infoTableRoutineView">
                <span>Repeticiones</span>
            </div>
            <div class="infoTableRoutineView">
                <span>Descanso</span>
            </div>
            <div class="infoTableRoutineView">
                <span>Peso</span>
            </div>
       `

       $headerModal.appendChild($headerTittle)
       $wrapperModal.appendChild($headerModal)
       $sectionTable.appendChild($sectionHeaderTable)
       $wrapperModal.appendChild($sectionTable)

//Segunda Copia

const $tableViewContainerRoutine = document.createElement('div');
const $tableItemsInfoRoutineView = document.createElement('div');
$tableViewContainerRoutine.classList.add('tableViewContainerRoutine');  
$tableItemsInfoRoutineView.classList.add('tableItemsInfoRoutineView');

$tableItemsInfoRoutineView.innerHTML = `
    <div class="itemTableViewInfo">
        <span>${exersies.nameExersies || '-'}</span>
    </div>
    <div class="itemTableViewInfo">
        <span>${exersies.seriesExersies || '-'}</span>
    </div>
    <div class="itemTableViewInfo">
        <span>${exersies.repeatExersies || '-'}</span>
    </div>
    <div class="itemTableViewInfo">
        <span>${exersies.intervalExersies || '-'}</span>
    </div>
    <div class="itemTableViewInfo">                         
        <span>${exersies.weightExersies || '-'}</span>                     
    </div>
`

$tableViewContainerRoutine.appendChild($tableItemsInfoRoutineView)
$sectionTable.appendChild($tableViewContainerRoutine)
$wrapperModal.appendChild($sectionTable)