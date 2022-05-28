var taskNumber = 0;
var pomodoro = 1500;
var timebreak = 300;
var timer = 0;
var paused = false;
var countdown;
var menVoice = true;
var currentTask = "Task1";

document.querySelector("#sound-btn").onclick = function(event) {
    if (menVoice){
        menVoice = false;
        this.textContent = "女性向け (click to switch)";
        this.style.backgroundColor = "#D66BA0";
        document.body.style.backgroundColor = "#EA526F";
    }
    else {
        menVoice = true;
        this.textContent = "男性向け (click to switch)";
        this.style.backgroundColor = "#9BD1E5";
        document.body.style.backgroundColor = "#5B85AA";
    }
}


function createLi(li_name, data, reps) {

    // create list
    let list = document.createElement('li');
    list.setAttribute("id", li_name);
    
    if (list.id == currentTask) {
        let start_button = document.createElement('i');
        start_button.setAttribute("class", "fa fa-play");
        start_button.setAttribute("id", "start-btn");
        // Update the clock every 1 second
        start_button.onclick = function () {
            paused = false;
            
            // currentList that is playing
            let currentList = document.querySelector("#" + currentTask);

            // current repetiton in this task
            let current_rep = currentList.querySelector('.rep-current');

            // total repetition in this task
            let total_rep = currentList.querySelector('.rep');

            // the state (state-rep or state-break) for this task
            let current_state = currentList.querySelector('.task-title');

            // initial state just before timer starts
            if (current_rep.innerHTML == "0") {
                timer = pomodoro;
                current_rep.innerHTML = "1";
            }

            countdown = setInterval(function() {
            
                var minutes = parseInt(timer / 60, 10);
                var seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
        
                document.querySelector('#time').textContent = minutes + " : " + seconds;
                
                // If the count down is finished, check if the rep is finished
                if (--timer < 0) {
                    
                    if (parseInt(current_rep.innerHTML) <= parseInt(total_rep.innerHTML) &&
                            current_state.id == "state-rep") {
                        // rep to break
                        current_state.id = "state-break";
                        timer = timebreak;
                    }
                    else if (parseInt(current_rep.innerHTML) < parseInt(total_rep.innerHTML) &&
                            current_state.id == "state-break") {
                        // break to next rep
                        current_state.id = "state-rep";
                        current_rep.innerHTML = parseInt(current_rep.innerHTML) + 1;
                        timer = pomodoro;
                    }
                    else {
                        // next task
                        timer = pomodoro;
                    }
                }
                
            }, 1000);
        }
        
        let pause_button = document.createElement('i');
        pause_button.setAttribute("class", "fa fa-pause");
        pause_button.setAttribute("id", "pause-btn");
        pause_button.onclick = function() {
            if(!paused){
                paused = true;
                clearInterval(countdown); // stop the clock
            }
        }
        list.appendChild(start_button);
        list.appendChild(pause_button);
    }
    else {
        list.setAttribute("class", "task");
    }

    // create delete button
    let delete_button = document.createElement('button');
    delete_button.setAttribute("class", "btn");
    delete_button.setAttribute("class", "delete-btn");
    delete_button.innerText = "Delete";
    delete_button.onclick = function() {
        let parent = delete_button.parentNode;
        document.querySelector("ul").removeChild(parent);
    }
    // create task name
    let task_title = document.createElement('span');
    task_title.setAttribute("class", "task-title");
    task_title.setAttribute("id", "state-rep");
    task_title.innerHTML = data;
    task_title.textContent += " ";

    // create rep
    let rep_cur = document.createElement('span');
    rep_cur.setAttribute("class", "rep-current");
    rep_cur.innerHTML = '0';
    let slash = document.createElement('span');
    slash.innerHTML = " / ";
    let rep = document.createElement('span');
    rep.setAttribute("class", "rep");
    rep.innerHTML = reps;
    rep.textContent += " ";

    list.appendChild(rep_cur);
    list.appendChild(slash);
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
    let rep_value = rep.value;
        
    if(!value) {
        alert("Name Cannot be empty!");
    }
    else if (!rep_value) {
        alert("Reps Cannot be empty!");
    }
    else {
        createLi("Task" + taskNumber, value, rep_value);
    }

}
