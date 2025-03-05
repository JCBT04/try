document.addEventListener("DOMContentLoaded", function () {
     const jsonURL = "https://jcbt04.github.io/appdev-subj_taken/courses.json";  // Use the correct URL
 
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
                 data.courses.forEach(subject => {
                     let listItem = document.createElement("li");
                     listItem.textContent = `${subject.year_level} Year - ${subject.sem} Sem | ${subject.code}: ${subject.description} (${subject.credit} Credits)`;
                     subjectsList.appendChild(listItem);
                 });
             } else {
                 console.error('Expected "courses" array but got:', data);
             }
         })
         .catch(error => console.error("Error fetching JSON:", error));
 });
 