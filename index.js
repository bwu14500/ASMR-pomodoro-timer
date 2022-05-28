var taskNumber = 0;
var pomodoro = 1500;
var timebreak = 300;

// Update the count down every 1 second
function countdownTimeStart() {
    var timer = pomodoro;
    var countdown = setInterval(function() {
        
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('#time').textContent = minutes + ":" + seconds;
      
        // If the count down is finished, write some text 
        if (--timer < 0) {
            timer = pomodoro;
        }
      
      }, 1000);
}

function createLi(li_name, data, reps) {

    // create list
    let list = document.createElement('li');
    list.setAttribute("class", "task");
    list.setAttribute("id", li_name);
    list.style.listStyleType = "none";
    
    if (list.id == "Task1") {
        let start_button = document.createElement('i');
        start_button.setAttribute("class", "fa fa-play");
        start_button.setAttribute("id", "start-button");

        let pause_button = document.createElement('i');
        pause_button.setAttribute("class", "fa fa-pause");

        list.appendChild(start_button);
        list.appendChild(pause_button);
    }

    // create delete button
    let delete_button = document.createElement('button');
    delete_button.setAttribute("class", "btn btn-success");
    delete_button.innerText = "Delete";

    // create task name
    let task_title = document.createElement('span');
    task_title.innerHTML = data;

    // create rep
    let rep_cur = document.createElement('span');
    rep_cur.innerHTML = '0';
    let rep = document.createElement('span');
    rep.innerHTML = reps;

    list.appendChild(rep_cur);
    list.appendChild(rep);
    list.appendChild(task_title);
    list.appendChild(delete_button);

    document.querySelector(".tasklist").appendChild(list);
}

document.querySelector("#task-form").onsubmit = function(event) {
    event.preventDefault();
    taskNumber += 1;
              
    let task = document.getElementById('task-text');
    let rep = document.getElementById('number');
    let value = task.value;
        
    if(!value) {
        alert("Name Cannot be empty!");
    } 
    else {
        createLi("Task" + taskNumber, value, ' / ' + rep.value);
    }

}

