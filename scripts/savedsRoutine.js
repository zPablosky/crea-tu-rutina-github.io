const containerArticleSaveds = document.querySelector('.containerRoutinesSaves');

document.addEventListener('DOMContentLoaded', () => {

    function cargarContenedoresGuardados() {
        const contenedoresGuardadosJSON = localStorage.getItem('articleRoutineSaveds');
        let contenedores = [];

        if (contenedoresGuardadosJSON) {
            try {
                contenedores = JSON.parse(contenedoresGuardadosJSON);
            } catch (error) {
                console.error('Error al leer los contenedores guardados de localStorage:', error);
                contenedores = [];
            }
        }

        if (contenedores) {
            contenedores.forEach((contenedor) => {
                // Aseguramos que cada contenedor tenga un ID único.
                // Si no viene del localStorage, lo generamos aquí.
                // Idealmente, este ID debería venir de la página de origen.
                contenedor.id = `routine-${Date.now()}-}`;

                if (contenedor && contenedor.html) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = contenedor.html;

                    // El elemento real que contiene el HTML de la rutina
                    const articleElement = tempDiv.firstElementChild;

                    if (articleElement) {
                        // Asignar el data-id al elemento HTML real
                        articleElement.setAttribute('data-id', contenedor.id);

                        // Asegurarse de que el botón de eliminar tenga la clase correcta y el texto
                        const button = articleElement.querySelector('.agreeRoutine');
                        button.textContent = 'Eliminar'; // Cambiar el texto del botón

                        containerArticleSaveds.appendChild(articleElement);
                    } else {
                        console.warn("Elemento HTML no válido encontrado en el contenedor guardado:", contenedor);
                    }
                }
            });
            
            // Una vez cargados, actualizamos localStorage con los posibles nuevos IDs generados
            localStorage.setItem('articleRoutineSaveds', JSON.stringify(contenedores));
        }

        // Después de cargar y añadir los contenedores al DOM, adjuntamos los event listeners.
        // Esto es crucial porque los botones solo existen en el DOM después de `cargarContenedoresGuardados()`.
        adjuntarEventosEliminar();
        viewMoreContainerWrapper ();
        getDatesRoutine ()
    }

    // Función para adjuntar los event listeners a los botones de eliminar
    function adjuntarEventosEliminar() {
        const articleButtonQuit = document.querySelectorAll('.agreeRoutine');

        articleButtonQuit.forEach((button) => {
            button.addEventListener('click', () => {
                const contenedorAEliminar = event.target.closest('.articleRoutine');

                if (!contenedorAEliminar) {
                    console.warn("No se encontró el contenedor padre con clase '.articleRoutine'");
                    return;
                }
        
                const idAEliminar = contenedorAEliminar.getAttribute('data-id');
        
                if (!idAEliminar) {
                    console.warn("El contenedor no tiene un atributo 'data-id'. No se puede eliminar de localStorage.");
                    return;
                }
        
                // 1. Eliminar del HTML (DOM)
                contenedorAEliminar.remove();
        
                // 2. Eliminar del localStorage
                let contenedores = JSON.parse(localStorage.getItem('articleRoutineSaveds')) || [];
        
                // Filtrar el array para remover el contenedor con el ID correspondiente
                const contenedoresActualizados = contenedores.filter(contenedor => contenedor.id !== idAEliminar);
        
                localStorage.setItem('articleRoutineSaveds', JSON.stringify(contenedoresActualizados));
            })
        });
    }

    // Llama a la función principal al cargar el DOM
    cargarContenedoresGuardados();

    function viewMoreContainerWrapper () {
            const buttonCloseContainerViewMore = document.querySelector('.closeViewMoreRoutine')

            buttonCloseContainerViewMore.addEventListener('click', () => {
                document.querySelector('.wrapperViewMoreRoutines').classList.remove('openContainerViewMoreRoutine')

                 document.querySelector('.wrapperViewMoreRoutines').classList.add('closeContainerViewMoreRoutine')
                 document.querySelector('.contaienerViewMoreRoutines').classList.remove('contaienerViewMoreRoutinesOpen')
            })

            const buttonOpenContainerViewMore = document.querySelectorAll('.viewMoreRoutine');

            buttonOpenContainerViewMore.forEach((button) => {
                 button.addEventListener('click', () => {
                 document.querySelector('.wrapperViewMoreRoutines').classList.add('openContainerViewMoreRoutine')

                 document.querySelector('.contaienerViewMoreRoutines').classList.add('contaienerViewMoreRoutinesOpen')
            })
        })
    }
    
   
    
    async function getDatesRoutine () {
        try {
            const apiGet = await fetch('/scripts/api/routines.json');
            const apiJson = await apiGet.json()

            const nameContainerRoutine = document.querySelectorAll('.nameRoutineArticle');
            const buttonsViewMore = document.querySelectorAll('.viewMoreRoutine');
            const listDaysRoutines = document.querySelector('.viewMoreNavbarCategory');
            const closeContainerViewMore = document.querySelector('.closeViewMoreRoutine');

            const namesExersies = document.querySelector('.exerciesListRoutine_1')
            const seriesExersies = document.querySelector('.exerciesListRoutine_2')
            const repeatExersies = document.querySelector('.exerciesListRoutine_3')
            const descansoExersies = document.querySelector('.exerciesListRoutine_4')
            const pesoExersies = document.querySelector('.exerciesListRoutine_5')
           
           for(let indexNameApi = 0; indexNameApi < apiJson.rutinas.length; indexNameApi++){
            
            for(let indexNameRoutine = 0; indexNameRoutine < nameContainerRoutine.length; indexNameRoutine++){
                const nameRoutineNavbar = document.querySelector('.nameRoutineNavbarTitle')
                
                buttonsViewMore[indexNameRoutine].addEventListener('click', () => {
                    const getDatesNameRoutines = [apiJson.rutinas[indexNameApi].nombre]
                    const getDatesDaysRoutines = [apiJson.rutinas[indexNameApi].dias]

                    const filterDatesRoutine = getDatesNameRoutines.includes(nameContainerRoutine[indexNameRoutine].textContent)
 
                    if(filterDatesRoutine){
                        const getFilterDataName = getDatesNameRoutines.filter(date => date === nameContainerRoutine[indexNameRoutine].textContent)

                        
                        if(getFilterDataName){
                            nameRoutineNavbar.textContent = getFilterDataName.join('')
                        }

                       for(let daysIndex = 0; daysIndex < apiJson.rutinas[indexNameApi].dias.length; daysIndex++){
                           console.log(apiJson.rutinas[indexNameApi].dias[daysIndex].dia)
                           const daysRoutines = document.createElement('span');
                           daysRoutines.className = 'daysRoutineFilter'
                           daysRoutines.textContent = apiJson.rutinas[indexNameApi].dias[daysIndex].dia
                    
                           listDaysRoutines.appendChild(daysRoutines)                           
                       }

                       const daysRoutinesAll = document.querySelectorAll('.daysRoutineFilter')
                       const daysRoutinesExercies = apiJson.rutinas[indexNameApi];

                       for(let daysDayIndex = 0; daysDayIndex < daysRoutinesAll.length; daysDayIndex++){
                           if(daysRoutinesExercies){
                                const searchDayExersies = daysRoutinesExercies.dias.find(dias => dias.dia === daysRoutinesAll[0].textContent)
                            

                           if(searchDayExersies){
                            namesExersies.innerHTML = ''
                            seriesExersies.innerHTML = ''
                            repeatExersies.innerHTML = ''
                            descansoExersies.innerHTML = ''
                            pesoExersies.innerHTML = ''

                            searchDayExersies.ejercicios.forEach((ejercicio) => {
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
                        
                        daysRoutinesAll[daysDayIndex].addEventListener('click', () => {
                            namesExersies.innerHTML = ''
                            seriesExersies.innerHTML = ''
                            repeatExersies.innerHTML = ''
                            descansoExersies.innerHTML = ''
                            pesoExersies.innerHTML = ''
    
                            if(daysRoutinesExercies) {
                                const searchDayExersies = daysRoutinesExercies.dias.find(dias => dias.dia === daysRoutinesAll[daysDayIndex].textContent)
        
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
})
