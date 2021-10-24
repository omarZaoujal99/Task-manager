const dTaskUploaded = document.querySelector(".dTaskUploaded");
// get method, get all tasks
const tblTasks = document.getElementById("tbodyTasks");
window.addEventListener("load",()=>{
    axios({
        method: 'get',
        url: '/api/v1/tasks'
    })
    .then(async (res)=>{
        let tasks = res.data.getTask;
        let getAllTasks = ()=>{
            for(let i = 0; i < tasks.length; i++){
                tblTasks.innerHTML += `<tr>`+
                    `<td class="tdTaskName">${tasks[i].taskName}</td>`+
                    `<td><input type="hidden" value="${tasks[i]._id}" id="task${i}" class="taskId" /></td>`+
                    `<td><button class="btnTbl btnEdi"><i class="fas fa-edit edit"></i></button></td>`+
                    `<td><button class="btnTbl btnDel"><i class="fas fa-trash-alt delete"></i></button></td>`+
                `</tr>`;
            }
        }
        await getAllTasks();
        
        // input where I'll get the id of the row
        const taskId = await document.querySelectorAll(".taskId");
        // delete method, delete a task
        const btnDel = await document.querySelectorAll(".btnDel");
        for(let i = 0; i < btnDel.length; i++){
            btnDel[i].addEventListener("click",()=>{
                axios({
                    method: "delete",
                    url: "api/v1/tasks",
                    data: {
                        _id: taskId[i].value
                    }
                })
                .then(()=>{
                    alert("Task has been deleted successfuly!");
                    window.location.reload();
                })
                .catch(err=>console.log(err));
            })
        }

        // update method, updating a task
        const tblTaskUploaded = document.querySelector(".tblTaskUploaded");
        const btnEdit = document.querySelector(".btnEdit");
        const btnEdi = document.querySelectorAll(".btnEdi");
        for(let i = 0; i < btnEdi.length; i++){
            btnEdi[i].addEventListener("click",()=>{
                dTaskUploaded.style.display = "flex";
                tblTaskUploaded.innerHTML = "<tbody>"+
                    `<tr><td><strong>Id:</strong></td><td>${taskId[i].value}</td></tr>`+
                    `<tr><td><strong>Task:</strong></td><td><input type="text" value="${tasks[i].taskName}" class="inpEdit"/></td></tr>`+
                "</tbody>";
                btnEdit.addEventListener("click",(e)=>{
                    if(tasks[i].taskName.length < 2 || tasks[i].taskName.length > 20){
                        alert("Task name should be between 2 and 20 character!")
                        return e.preventDefault();
                    }
                    const inpEdit = document.querySelector(".inpEdit").value;
                    axios({
                        method: "patch",
                        url: "api/v1/tasks",
                        data: {
                            _id: taskId[i].value,
                            taskName: inpEdit
                        }
                    })
                    .then(()=>{
                        alert("Task name has been edited successfuly!")
                        window.location.reload();
                    })
                    .catch(err=>console.log(err));
                })
            })
        }
    })
    .catch((err)=>console.log(err));
})


// post method, create new task
const newTask = document.getElementById("newTask");
const btnAddNewTask = document.getElementById("btnAddNewTask")
btnAddNewTask.addEventListener("click",(e)=>{
    if(newTask.value.length < 2 || newTask.value.length > 20){
        alert("task name should be between 2 and 20 character!")
        return e.preventDefault();
    }
    axios({
        method: "post",
        url: "api/v1/tasks",
        data: {
            taskName: newTask.value
        }
    })
    .then((res)=>{
        alert("Task has been created successfuly")
        window.location.reload();
    })
    .catch((err)=>console.log("An error happened, try again later!"))
})

// close the upload box
const btnCancel = document.querySelector(".btnCancel");
btnCancel.addEventListener("click",()=>{
    dTaskUploaded.style.display = "none";
})