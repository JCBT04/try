document.addEventListener("DOMContentLoaded", function () {
     const jsonURL = "https://jcbt04.github.io/appdev-subj_taken/courses.json";
 
     fetch(jsonURL)
         .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }
             return response.json();
         })
         .then(data => {
             let subjectsList = document.getElementById("subjects-list");
 
             if (data.courses && Array.isArray(data.courses)) {
                 let grouped = {};
 
                 // Group subjects by year and semester
                 data.courses.forEach(subject => {
                     let key = `${subject.year_level} Year - ${subject.sem} Sem`;
                     if (!grouped[key]) {
                         grouped[key] = [];
                     }
                     grouped[key].push(subject);
                 });
 
                 // Render grouped subjects
                 for (let group in grouped) {
                     let groupTitle = document.createElement("li");
                     groupTitle.textContent = group;
                     groupTitle.classList.add("group-title");
                     subjectsList.appendChild(groupTitle);
 
                     grouped[group].forEach(subject => {
                         let listItem = document.createElement("li");
                         listItem.innerHTML = `<b>${subject.code}</b>: ${subject.description} (${subject.credit} Credits)`;
                         listItem.classList.add("subject-item");
                         subjectsList.appendChild(listItem);
                     });
                 }
             }
         })
         .catch(error => console.error("Error fetching JSON:", error));
 });
 
 // Search Functionality
 function searchSubjects() {
     let input = document.getElementById("search-bar").value.toLowerCase();
     let subjectItems = document.querySelectorAll(".subject-item");
 
     subjectItems.forEach(item => {
         if (item.textContent.toLowerCase().includes(input)) {
             item.style.display = "list-item";
         } else {
             item.style.display = "none";
         }
     });
 }
 