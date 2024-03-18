import subject from '../data/subjects.json' assert {type: 'json'}

let calendar_container = document.getElementById("calendars-container");

/**
 * 
 * @param {Array<Array>} subjects_list 
 * @param {HTMLDivElement} html_container 
 */
function load_calendars(subjects_list, html_container) {
    html_container.innerHTML = '';

    console.clear()
    console.log("Renderizando todas las materias.");

    subjects_list.map((quater, index) => {

        const calendar = document.createElement('div');
        const title = document.createElement('span');
        const subjects_container = document.createElement('div');


        calendar.className = 'calendar'
        title.className = 'title'
        subjects_container.className = 'asignatures'

        title.textContent = `Cuatrimestre ${index + 1}`
        title.setAttribute('role', 'header')
        title.setAttribute('quater', index)

        quater.map((sub, subindex) => {
            const subject = document.createElement('span');

            subject.id = sub.id
            subject.textContent = sub.name

            subject.setAttribute('role', 'subject')
            subject.setAttribute('name', sub.name)
            subject.setAttribute('quater', index)
            subject.setAttribute('asignature', subindex)

            subjects_container.appendChild(subject)
        })

        calendar.appendChild(title)
        calendar.appendChild(subjects_container)
        html_container.appendChild(calendar)
    })
}

/**
 * 
 * @param {Array<Array>} subjects_list 
 */
function refresh_asignatures(subjects_list) {
    subject.map((quar) => {
        quar.map((sub) => {
            const id = sub.id
            const style_class = sub.status === 'not-cursed' ? "" : sub.status;

            const element = document.getElementById(id);
            element.className = style_class
        })
    })
}

/**
 * 
 * @param {HTMLSpanElement} element 
 */
function update_serials_assignature_list(element, click_type = 'L' | 'R') {

    const action_type = click_type === 'R' ? 'failed' : 'approved';
    const quater = parseInt(element.getAttribute('quater'));

    if (element.getAttribute('role') === 'header') {
        let are_all_same_typo = true

        subject[quater].map((current_subject) => {
            are_all_same_typo = are_all_same_typo && (action_type === current_subject.status)
            current_subject.status = action_type
            current_subject.has_changed = true;
        })

        if (are_all_same_typo) {
            subject[quater].map((current_subject) => {
                current_subject.status = 'not-cursed';
                current_subject.has_changed = true;
            })
        }
    }

    if (element.getAttribute('role') === 'subject') {
        const asignature = parseInt(element.getAttribute('asignature'));

        if (element.className) {
            if (element.className === action_type) {
                element.className = ''
                subject[quater][asignature].status = 'not-cursed'
                subject[quater][asignature].has_changed = true;

            } else {
                subject[quater][asignature].status = action_type;
                subject[quater][asignature].has_changed = true
            }
        } else {
            subject[quater][asignature].status = action_type;
            subject[quater][asignature].has_changed = true
        }
    }

    check_seriation()
    refresh_asignatures(subject);
}

function check_seriation() {
    const failed = new Set();
    const not_cursed = new Set();
    const approved = new Set();
    const available = new Set();
    const unavailable = new Set();


    subject.map((cuatrimestre, index) => {
        cuatrimestre.map((materia) => {
            if (!materia.has_changed) return

            if (materia.status === 'failed') { // SI HA SIDO REPROBADO

                materia.dependencies.forEach((val) => {
                    unavailable.add(val);
                })
                materia.dependents.forEach((val) => {
                    approved.add(val);
                })

                recursive_mark(index, false, materia.dependencies, unavailable)
                recursive_mark(index, true, materia.dependents, approved)

                failed.add(materia.id);
            }

            if (materia.status === 'not-cursed') { // SI NO HA SIDO CURSADO

                materia.dependencies.forEach((val) => {
                    unavailable.add(val);
                })

                recursive_mark(index, false, materia.dependencies, unavailable)

                available.add(materia.id);
            }

            if (materia.status === 'approved') { // SI ESTÁ APROBADO

                materia.dependencies.forEach((val) => {
                    not_cursed.add(val);
                })
                materia.dependents.forEach((val) => {
                    approved.add(val);
                })

                recursive_mark(index, false, materia.dependencies, unavailable)
                recursive_mark(index, true, materia.dependents, approved)

                approved.add(materia.id);
            }

            materia.has_changed = false
        })
    })


    subject.map((cuatrimestre) => {
        cuatrimestre.map((materia) => {
            const current_id = materia.id

            if (failed.has(current_id)) {
                materia.status = 'failed';
            }

            if (not_cursed.has(current_id)) {
                materia.status = 'not-cursed';
            }

            if (approved.has(current_id)) {
                materia.status = 'approved'
            }

            if (available.has(current_id)) {
                materia.status = 'not-cursed'
            }

            if (unavailable.has(current_id)) {
                materia.status = 'unavailable'
            }
        })
    })

}

/**
 * 
 * @param {number} cuatrimestre 
 * @param {boolean} reverse 
 * @param {Array<string>} items 
 * @param {Set} save_on 
 * @returns 
 */
function recursive_mark(cuatrimestre, reverse, items, save_on) {

    const current_cuatri = reverse ? --cuatrimestre : ++cuatrimestre;

    if (cuatrimestre >= subject.length || cuatrimestre <= 0) {
        return;
    }

    if (items.length === 0) {
        return;
    }

    subject[current_cuatri].map((materia) => {
        if (save_on.has(materia.id)) {
            if (reverse) {
                materia.dependents.forEach((ele) => { save_on.add(ele) })
            } else {
                materia.dependencies.forEach((ele) => { save_on.add(ele) })
            }
        }
    })

    recursive_mark(current_cuatri, reverse, save_on, save_on)
}

// Click Izquierdo Event Listener
calendar_container.addEventListener('click', (e) => {
    if (!e.target.getAttribute('role')) {

        return;
    }

    e.preventDefault()

    const element = e.target
    update_serials_assignature_list(element, 'L')
})

// Click derecho Event Listener
calendar_container.addEventListener('contextmenu', (e) => {
    if (!e.target.getAttribute('role')) {
        return;
    }

    e.preventDefault()

    const element = e.target
    update_serials_assignature_list(element, 'R')
})

load_calendars(subject, calendar_container)
check_seriation()
refresh_asignatures(subject);