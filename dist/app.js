"use strict";
console.log("Hello TodoList Application");
const btnEl = document.getElementById("btn");
const inputEl = document.getElementById("input");
const formEl = document.querySelector("form");
const listEl = document.getElementById("list");
const clearEl = document.getElementById("clear");
formEl.addEventListener("submit", saveData);
clearEl.addEventListener("click", clearData);
let tasks = readData();
tasks.forEach(createList);
// add text to list HTML, add text to array, set local storage
function saveData(e) {
    e.preventDefault();
    console.log("saveData() " + inputEl.value);
    const message = inputEl.value;
    const newTask = {
        name: inputEl.value,
        completed: false
    };
    createList(newTask);
    tasks.push(newTask);
    console.log(tasks);
    localStorage.setItem("myList", JSON.stringify(tasks));
}
//add list item 
function createList(task) {
    const liEl = document.createElement("li");
    const chkEl = document.createElement("input");
    chkEl.type = "checkbox";
    chkEl.checked = task.completed;
    chkEl.addEventListener("change", function () {
        task.completed = chkEl.checked;
        updateData();
    });
    console.log("create chkbox " + chkEl);
    liEl.append(task.name);
    liEl.append(chkEl);
    console.log("crate list item " + liEl);
    //liEl.innerText = text;
    listEl.append(liEl);
    inputEl.value = "";
}
//read data from local storage
function readData() {
    const myList = localStorage.getItem("myList");
    console.log("readData mylist" + myList);
    if (myList == null)
        return [];
    else {
        return JSON.parse(myList);
    }
}
//update status of checkbox
function updateData() {
    localStorage.setItem("myList", JSON.stringify(tasks));
}
//clear list items in html, clear localStorage, clear array
function clearData(e) {
    e.preventDefault();
    tasks = [];
    console.log("localStorage myList = " + localStorage.getItem("myList"));
    localStorage.removeItem("myList");
    console.log("localStorage myList = " + localStorage.getItem("myList"));
    while (listEl.hasChildNodes()) {
        listEl.removeChild(listEl.children[0]);
    }
}
btnEl.addEventListener("click", function () {
    //console.log(inputEl.value);
});
