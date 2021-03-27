const date = document.querySelector("#date");
const input = document.querySelector("#input");
const addTaskBtn = document.querySelector("#addTaskBtn");
const tasks = document.querySelector("#tasks")

// Formatting date
var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear();
	
var today =  curMonth + " " + dayOfMonth + ", " + curYear;


date.textContent= today;


// Add Task Button
const addtask=()=>{
    const newCheckBox = document.createElement("input");
    newCheckBox.setAttribute("type","checkbox");

    newCheckBox.onclick=()=>{
        console.log(newCheckBox.checked);
        if(newCheckBox.checked==true){
            const currentlabel = newCheckBox.nextSibling;
            currentlabel.style.textDecoration = "line-through";
        }
        else{
            const currentlabel = newCheckBox.nextSibling;
            currentlabel.style.textDecoration = "none";
        }
    }
    

    const newDiv = document.createElement("div");

    const newPara = document.createElement("p");
    newPara.textContent= input.value;

    const newEditBtn = document.createElement("button");
    newEditBtn.textContent= "Edit";
    newEditBtn.addEventListener("click",editTask);

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.textContent= "Delete";
    newDeleteBtn.addEventListener("click",(e)=>e.target.parentElement.remove());

    tasks.appendChild(newDiv);
    newDiv.appendChild(newCheckBox);
    newDiv.appendChild(newPara);
    newDiv.appendChild(newEditBtn);
    newDiv.appendChild(newDeleteBtn);

    input.value="";

}

addTaskBtn.addEventListener("click",addtask);
console.log(addTaskBtn);

const editTask= (e)=>{
    const Ctask= e.target.previousSibling;
    const update = (e) => {
        Ctask.textContent = input.value;
        addTaskBtn.textContent="Add Task";
        addTaskBtn.removeEventListener("click",update);
        addTaskBtn.addEventListener("click",addtask);
        console.log(Ctask);
        console.log(addTaskBtn);
        input.value="";
    }

    input.value=Ctask.textContent;
    addTaskBtn.textContent="Update";
    addTaskBtn.removeEventListener("click",addtask);
    addTaskBtn.addEventListener("click",update);
    console.log(Ctask);
    console.log(addTaskBtn);
}





