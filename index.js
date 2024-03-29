var taskNumber = 0;
var pomodoro = 1500;
var timebreak = 300;
var timer = 0;
var temp_timer = 0;
var paused = false;
var countdown;
var menVoice = true;
var currentTask = "Task1";
var currentList;
var current_rep;
var total_rep;
let current_state = "state-break";

// ------------------------------------------------ Audio ----------------------------------------------------
var audio = document.querySelector("audio");
var male_playlist = new Array("men_voice.mp3");
var male_index = 0;
var female_playlist = new Array("women_voice.mp3");
var female_index = 0;

function playNextAudio() {
    if (menVoice) {
        audio.src = male_playlist[male_index];
        audio.play();

        male_index = ++male_index < male_playlist.length ? male_index : 0;
    }
    else {
        audio.src = female_playlist[female_index];
        audio.play();

        female_index = ++female_index < female_playlist.length ? female_index : 0;
    }
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}
// -----------------------------------------------------------------------------------------------------------

// start button on click
document.querySelector("#start-btn").onclick = function() {
    // toggle to pause button
    this.style.display = "none";
    document.querySelector("#pause-btn").style.display = "inline";
    // get into working state (orange background and Fighting!)
    if (document.querySelector("#current-state").textContent == "Let's Get Started!") {
        document.body.style.backgroundColor = "#FF9B42";
        document.querySelector("#current-state").textContent = "Fighting!";
    }

    currentList = document.querySelector("#" + currentTask);

    // current repetiton in this task
    current_rep = currentList.querySelector('.rep-current');

    // total repetition in this task
    total_rep = currentList.querySelector('.rep');

    // the state (state-rep or state-break) for this task
    current_state = currentList.querySelector('.task-title');

    // initial state just before timer starts
    if (current_rep.innerHTML == "0") {
        timer = pomodoro;
    }

    countdown = setInterval(function() {
        
        if (paused == true) {
            paused = false;
            timer = temp_timer;
        }

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
                current_rep.innerHTML = parseInt(current_rep.innerHTML) + 1;
                if (menVoice){
                    document.body.style.backgroundColor = "#5B85AA";
                    playNextAudio();
                }
                else {
                    document.body.style.backgroundColor = "#EA526F";
                    playNextAudio();
                }
                document.querySelector("#current-state").textContent = "Take a Break!"
            }
            else if (parseInt(current_rep.innerHTML) < parseInt(total_rep.innerHTML) &&
                    current_state.id == "state-break") {
                // break to next rep
                current_state.id = "state-rep";
                timer = pomodoro;
                document.body.style.backgroundColor = "#FF9B42";
                stopAudio();
                document.querySelector("#current-state").textContent = "Fighting!";
            }
            else {
                // next task
                timer = pomodoro;

                // Change finished task display (remove start and pause button, display completed status)
                let task_complete = document.createElement('span');
                task_complete.setAttribute("class", "task-complete");
                task_complete.setAttribute("id", "1");
                task_complete.innerHTML = "My task " + current_state.innerHTML + " is complete!";

                // delete button to delete the completed task
                let delete_button = document.createElement('button');
                delete_button.setAttribute("class", "btn");
                delete_button.setAttribute("id", "delete-btn");
                delete_button.innerText = "Delete";
                delete_button.onclick = function() {
                    let parent = delete_button.parentNode;
                    document.querySelector("ul").removeChild(parent);
                }
                currentList.replaceChildren(task_complete, delete_button);

                // Select next task
                next_task();
                
            }
        }
        
    }, 1000);
}

document.querySelector("#pause-btn").onclick =  function() {
    // toggle to pause button
    this.style.display = "none";
    document.querySelector("#start-btn").style.display = "inline";
    if(!paused){
        paused = true;
        audio.pause();
        temp_timer = timer;
        clearInterval(countdown); // stop the clock
    }
}

document.querySelector("#fast-forward-btn").onclick = function() {
    timer = 0;
}

// reset back to original state
function reset() {
    taskNumber = 0;
    timer = 0;
    clearInterval(countdown);
    paused = false;
    menVoice = true;
    currentTask = "Task1";
    current_state = "state-break";
    document.querySelector("#current-state").textContent == "Let's Get Started!";
    stopAudio();
    // let start and pause not work
    document.querySelector("#start-btn").style.display = "none";
    document.querySelector("#pause-btn").style.display = "none";
    document.querySelector("#fast-forward-btn").style.display = "none";
    document.querySelector('#time').textContent = "25 : 00";
    document.querySelector("#current-state").textContent = "Let's Get Started!"
    document.querySelector(".front").textContent = "男性向け (click to switch)";
    document.querySelector(".pushable").style.background = "#D1FAFF";
    document.querySelector(".front").style.background = "#9BD1E5";
    document.body.style.backgroundColor = "#5B85AA";
}

// select next task
function next_task() {
    // select next task as the current task
    stopAudio();
    taskNumber -= 1;
    console.log(taskNumber);
    if (taskNumber == 0) {
        reset();
    }
    else {
        currentList = currentList.nextElementSibling;
        currentTask = currentList.id;

        current_rep = currentList.querySelector('.rep-current');
        total_rep = currentList.querySelector('.rep');
        current_state = currentList.querySelector('.task-title');
        current_state.id = "state-rep";
        document.body.style.backgroundColor = "#FF9B42";
        document.querySelector("#current-state").textContent = "Fighting!"
        if (current_rep.innerHTML == "0") {
            timer = pomodoro;
        }
    }
}

function createLi(li_name, data, reps) {

    // create list
    let list = document.createElement('li');
    list.setAttribute("id", li_name);
    
    taskNumber += 1;
    if (taskNumber == 1) {
        currentTask = list.id;
        // let start and pause work
        document.querySelector("#start-btn").style.display = "inline";
        document.querySelector("#fast-forward-btn").style.display = "inline";
    }

    if (list.id == currentTask) {
        // created list is current task
        currentList = document.querySelector("#" + currentTask);
    }
    list.setAttribute("class", "task");

    // create delete button
    let delete_button = document.createElement('button');
    delete_button.setAttribute("class", "btn");
    delete_button.setAttribute("id", "delete-btn");
    delete_button.innerText = "Delete";
    delete_button.onclick = function() {
        let parent = delete_button.parentNode;
        if (parent.id == currentTask) {
            // replace to new task
            next_task(parent);
        }
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
    slash.innerHTML = "/";
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

document.querySelector("#sound-btn").onclick = function() {
    let soundBtn = document.querySelector("#sound-btn");
    if (current_state == "state-break") {
        if (menVoice){
            menVoice = false;
            document.querySelector(".front").textContent = "女性向け (click to switch)";
            document.querySelector(".pushable").style.background = "#E76B74";
            document.querySelector(".front").style.background = "#D66BA0";
            document.body.style.background = "#EA526F";
        }
        else {
            menVoice = true;
            document.querySelector(".front").textContent = "男性向け (click to switch)";
            document.querySelector(".pushable").style.background = "#D1FAFF";
            document.querySelector(".front").style.background = "#9BD1E5";
            document.body.style.background = "#5B85AA";
        }
    }
    else {
        if (menVoice){
            menVoice = false;
            document.querySelector(".front").textContent = "女性向け (click to switch)";
            document.querySelector(".pushable").style.background = "#E76B74";
            document.querySelector(".front").style.background = "#D66BA0";
        }
        else {
            menVoice = true;
            document.querySelector(".front").textContent = "男性向け (click to switch)";
            document.querySelector(".pushable").style.background = "#D1FAFF";
            document.querySelector(".front").style.background = "#9BD1E5";
            soundBtn.style.background = "#9BD1E5";
        }
    }
}

document.querySelector("#task-form").onsubmit = function(event) {
    event.preventDefault();

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