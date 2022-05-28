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

function createDiv(div_name, data, reps) {

    // create list
    let list = document.createElement('li');
    list.setAttribute("id", div_name);
    list.setAttribute("list-style-type", "none");

    // create button
    let delete_button = document.createElement('button');

    // create task name
    let task_title = document.createElement('span');
    task_title.innerHTML = data;

    // create rep
    let rep = document.createElement('span');
    rep.innerHTML = reps;

    list.appendChild(task_title);
    list.appendChild(rep);
    list.appendChild(delete_button);

    document.getElementById('my_ul').appendChild(list);
}

function createTask() {

    taskNumber += 1;
              
    let task = document.getElementById('task_name');
    let rep = document.getElementById('rep');
    let value = task.value;
        
    if(!value) {
        alert("Name Cannot be empty!");
    } 
    else {
        createDiv("my_task" + taskNumber, value, rep.value);
    }

}

