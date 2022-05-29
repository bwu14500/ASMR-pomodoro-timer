// replace task with complete task
let task_complete = document.createElement('span');
task_complete.setAttribute("class", "task-complete");
task_complete.setAttribute("id", "1");
task_complete.innerHTML = "My task " + current_state.innerHTML + " is complete!";
currentList.replaceChildren(task_complete);



// select next task as the current task
taskNumber -= 1;
if (taskNumber == 0) {
    // back to the original settings
}
else {
    currentList = currentList.nextElementSibling;
    currentTask = currentList.id;

    // add the play and pause button
}

// Delete
if (parent.id == currentTask) {
    // replace to new task
}

// audio add
var audio = new Audio();
var male_playlist = new Array("", "", "", "", "");
var male_index = 0;
var female_playlist = new Array("", "", "", "", "");
var female_index = 0;

// gender: true = male, false = female
function playNextAudio(gender) {
    if (gender == true) {
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