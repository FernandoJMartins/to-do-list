let tasks = []



const input = document.querySelector("input");
const inputs = document.querySelector("#inputs");


input.addEventListener("click", (e) => {
    createNewInput();
})

function createNewInput(){

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "input");

    inputs.appendChild(newInput);

    newInput.addEventListener("click", (event) => {
            createNewInput();
        });
}



function renderTaskONHTML(task, done = false){
    const ul = document.querySelector("#tasks")
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox")
    input.className = "ck"
    input.checked = done
    
    input.addEventListener("change", (event) => {
        const liToggle = event.target.parentElement
        const done = event.target.checked
        const spanToggle = liToggle.querySelector("span")

        
        if (done){
            spanToggle.style.textDecoration = "line-through"
            spanToggle.style.color = "grey"
        }
        else{
            spanToggle.style.color = "black"
            spanToggle.style.textDecoration = "none"
        }

        tasks = tasks.map(t => {
            if (t.title === spanToggle.textContent){
                return {
                    title: t.title,
                    done: !t.done
                }
            }
            return t
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })


    const span = document.createElement("span");
    span.textContent = task

    if (done){
        span.style.textDecoration = "line-through"
    }

    const btn = document.createElement("button")
    btn.className = "rmv"
    btn.textContent = "X"
    btn.addEventListener("click", (event) => {
        const liToRemove = event.target.parentElement
        const taskRemove = liToRemove.querySelector("span").
        textContent

        tasks = tasks.filter(t => t.title !== taskRemove)

        ul.removeChild(liToRemove)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })

    
    li.appendChild(input)
    li.appendChild(span);
    li.appendChild(btn);

    ul.appendChild(li)
}

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem("tasks")
    if (!tasksOnLocalStorage){
        return
    }
    tasks = JSON.parse(tasksOnLocalStorage)

    tasks.forEach(t => {
        renderTaskONHTML(t.title, t.done)
    });
}

function addTask(event) {
    event.preventDefault(); // Don't refresh page

    const newTask = document.querySelector("#input"); // get the user input.
    const task = newTask.value

    if (task < 3){
        alert("sua tarefa precisa possuir pelo menos 3 caracteres")
        return;
    }

    tasks.push({
        title: task,
        done: false
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTaskONHTML(task)

    newTask.value = ''
}

