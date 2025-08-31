const containerRoutine = document.querySelectorAll('.articleRoutine')
const nameRoutineArticle = document.querySelectorAll('.nameRoutineArticle');
const categoryRoutineArticle = document.querySelectorAll('.categoryRoutineArticle');
const dificultadRoutine = document.querySelectorAll('.dificultadRoutine');
const durationRoutine = document.querySelectorAll('.durationRoutine');
const boarProgress = document.querySelectorAll('.boarProgress');
const viewMoreRoutineButton = document.querySelectorAll('.viewMoreRoutine');
const agreeRoutine = document.querySelectorAll('.agreeRoutine');
const cantidadOfExersiesRoutine = document.querySelectorAll('.cantidadOfExersiesRoutine');
const listDaysRoutines = document.querySelector('.viewMoreNavbarCategory');
const closeContainerViewMore = document.querySelector('.closeViewMoreRoutine')

const buttonsCategoryFilter = document.querySelectorAll('.categoryRoutine');

async function getDataFromTheApi () {
    try {
        const apiGet = await fetch('/scripts/api/routines.json');
        const apiJson = await apiGet.json()

        for(let i = 0; i < apiJson.rutinas.length; i++){
            nameRoutineArticle[i].textContent = apiJson.rutinas[i].nombre;
            categoryRoutineArticle[i].textContent = apiJson.rutinas[i].Categoria;
            dificultadRoutine[i].textContent = apiJson.rutinas[i].dificultad;
            durationRoutine[i].textContent = `${apiJson.rutinas[i].duracion} Min`;
            cantidadOfExersiesRoutine[i].textContent = apiJson.rutinas[i].cantidad;

            boarProgress[i].style.width = `${apiJson.rutinas[i].dificultad_num}%`
        }

        buttonsCategoryFilter.forEach((button) => {
            button.addEventListener('click', () => {
                let valueButtonText = button.textContent.toLowerCase();

                containerRoutine.forEach((container, index) => {
                    let valueFilterName = categoryRoutineArticle[index].textContent.toLowerCase();
                    let validationFilter = valueFilterName.includes(valueButtonText);

                    if(validationFilter){
                        container.classList.remove('filterContainerRoutines')
                    }else{
                        container.classList.add('filterContainerRoutines')
                    }
                })
            })
        })

        document.querySelector('.categoryRoutineAll').addEventListener('click', () => {
            containerRoutine.forEach((container) => {
                container.classList.remove('filterContainerRoutines')
            })
        })

            const agreeButtonRoutine = document.querySelectorAll('.agreeRoutine');

            agreeButtonRoutine.forEach((buttonAgree) => {
                buttonAgree.addEventListener('click', (event) => {
                   const container_ArticleRoutine = event.target.closest('.articleRoutine');
                   const textContainerRoutine = container_ArticleRoutine.textContent;

                   let contenedoresSaveds = JSON.parse(localStorage.getItem('articleRoutineSaveds')) || [];

                   const tempArticleRoutine = document.createElement('div');
                   tempArticleRoutine.innerHTML = container_ArticleRoutine.outerHTML

                   const articleRoutine_New = tempArticleRoutine.innerHTML;

                   const containerNewArticle = {
                       text: textContainerRoutine,
                       html: articleRoutine_New
                   }

                   contenedoresSaveds.push(containerNewArticle);

                   localStorage.setItem('articleRoutineSaveds',JSON.stringify(contenedoresSaveds))
                })
            })

    } catch (error) {
        
    }
}

getDataFromTheApi ()

async function viewRoutine () {
    try {
        const apiGet = await fetch('/scripts/api/routines.json');
        const apiJson = await apiGet.json()

        const namesExersies = document.querySelector('.exerciesListRoutine_1')
        const seriesExersies = document.querySelector('.exerciesListRoutine_2')
        const repeatExersies = document.querySelector('.exerciesListRoutine_3')
        const descansoExersies = document.querySelector('.exerciesListRoutine_4')
        const pesoExersies = document.querySelector('.exerciesListRoutine_5')
        const nameRoutineNavbar = document.querySelector('.nameRoutineNavbarTitle')

        for(let i = 0; i < apiJson.rutinas.length; i++) {
            viewMoreRoutineButton[i].addEventListener('click', () => {
                nameRoutineNavbar.textContent = apiJson.rutinas[i].nombre
                
                for(let diaIndex = 0; diaIndex < apiJson.rutinas[i].dias.length; diaIndex++){
                    const daysRoutines = document.createElement('span');
                    daysRoutines.className = 'daysRoutineFilter'
                    daysRoutines.textContent = apiJson.rutinas[i].dias[diaIndex].dia
                    
                    listDaysRoutines.appendChild(daysRoutines)

                    const daysRoutinesAll = document.querySelectorAll('.daysRoutineFilter')
                    const daysRoutinesExercies = apiJson.rutinas[i];

                  for(let daysIndex = 0; daysIndex < daysRoutinesAll.length; daysIndex++) {
                    if(daysRoutinesExercies) {
                        const searchDayExersies = daysRoutinesExercies.dias.find(dias => dias.dia === daysRoutinesAll[0].textContent)

                    if(searchDayExersies) {
                        namesExersies.innerHTML = ''
                        seriesExersies.innerHTML = ''
                        repeatExersies.innerHTML = ''
                        descansoExersies.innerHTML = ''
                        pesoExersies.innerHTML = ''

                        searchDayExersies.ejercicios.forEach((ejercicio) => {
                        console.log(ejercicio.nombre)
                        const nameExersie = document.createElement('span');
                        const seriesExersie = document.createElement('span');
                        const repeatExersie = document.createElement('span');
                        const descansoExersie = document.createElement('span');
                        const pesoExersie = document.createElement('span')
                        
                        nameExersie.textContent = ejercicio.nombre
                        seriesExersie.textContent = ejercicio.series
                        repeatExersie.textContent = ejercicio.repeticiones
                        descansoExersie.textContent = ejercicio.descanso
                        pesoExersie.textContent = ejercicio.peso

                        namesExersies.appendChild(nameExersie)
                        seriesExersies.appendChild(seriesExersie)
                        repeatExersies.appendChild(repeatExersie)
                        descansoExersies.appendChild(descansoExersie)
                        pesoExersies.appendChild(pesoExersie)
                    })
                   }
                }

                      daysRoutinesAll[daysIndex].addEventListener('click', () => {
                        namesExersies.innerHTML = ''
                        seriesExersies.innerHTML = ''
                        repeatExersies.innerHTML = ''
                        descansoExersies.innerHTML = ''
                        pesoExersies.innerHTML = ''

                        if(daysRoutinesExercies) {
                            const searchDayExersies = daysRoutinesExercies.dias.find(dias => dias.dia === daysRoutinesAll[daysIndex].textContent)
    
                        if(searchDayExersies) {
                            searchDayExersies.ejercicios.forEach((ejercicio) => {
                            console.log(ejercicio.nombre)
                            const nameExersie = document.createElement('span');
                            const seriesExersie = document.createElement('span');
                            const repeatExersie = document.createElement('span');
                            const descansoExersie = document.createElement('span');
                            const pesoExersie = document.createElement('span')
                            
                            nameExersie.textContent = ejercicio.nombre
                            seriesExersie.textContent = ejercicio.series
                            repeatExersie.textContent = ejercicio.repeticiones
                            descansoExersie.textContent = ejercicio.descanso
                            pesoExersie.textContent = ejercicio.peso
    
                            namesExersies.appendChild(nameExersie)
                            seriesExersies.appendChild(seriesExersie)
                            repeatExersies.appendChild(repeatExersie)
                            descansoExersies.appendChild(descansoExersie)
                            pesoExersies.appendChild(pesoExersie)
                        })
                    }
                }
             })
           }
        }
    })  
}

        closeContainerViewMore.addEventListener('click', () => {
            listDaysRoutines.innerHTML = ''
            namesExersies.innerHTML = ''
            seriesExersies.innerHTML = ''
            repeatExersies.innerHTML = ''
            descansoExersies.innerHTML = ''
            pesoExersies.innerHTML = ''
        
            console.clear()
        })

    } catch (error) {
        
    }
}

viewRoutine ()