var courseApi = 'http://localhost:3000/course';


function start() {
    // getCourses(renderCourses);
    getCourses(courses => {
        renderCourses(courses);
    });

    handleCreateForm();
}

start();

function getCourses(callback){
    fetch(courseApi) 
        .then(response=> {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback){
    // var object = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data,)
    // }
    // fetch(courseApi, object)
    //     .then(function(reponse){
    //         return reponse.json();
    //     }) 
    //     .then(callback)

    var method = {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(courseApi, method)
        .then(response => response.json())
        .then(callback)
}

function handleCreateForm(){
    // var createBtn = document.getElementById('create');
    // createBtn.onclick = function(){
    //     var name = document.querySelector('input[name = "name"]').value;
    //     var description = document.querySelector('input[name = "description"]').value;

    //     var formData = {
    //         name: name,
    //         description: description
    //     }

    //     createCourse(formData);
    // }

    var createBtn = document.getElementById('create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name ="description"]').value;

        var data = {
            name,
            description
        }

        createCourse(data);
    }
}

function handleDeleteCourse(id){
    var object = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(courseApi + "/" + id, object)
        .then(function(reponse){
            return reponse.json();
        }) 
        .then(function(){
            var courseItems = document.querySelector('.course-item-' + id);
            if (courseItems) {
                courseItems.remove();
            }
        })
    // var method = {
    //     method: 'DELETE',
    //     cache: 'no-cache',
    //     mode: 'cors',
    //     credentials: 'same-origin',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }
    // fetch(courseApi + "/" + id, method)
    //     .then(response => response.json())
    //     .then(() => {
    //         var courseItems = document.getElementById('course-'+ id);
    //         console.log(courseItems);
    //         if(courseItems) {
    //             courseItems.remove();
    //         }
    //     })
}

function updateCourse(id, data, callback) {
    var method = {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch (courseApi + "/" + id, method )
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback)
}

function handleUpdateCourse(id) {
    var createBtn = document.getElementById('create');
    var courseItems = document.getElementById('course-'+ id);
    var title = courseItems.querySelector('h4').innerText;
    var description = courseItems.querySelector('p').innerText;
    document.querySelector('input[name="name"]').value = title;
    document.querySelector('input[name="description"]').value = description;
    createBtn.onclick = function() {
        var nameInput = document.querySelector('input[name="name"]').value;
        var descriptionInput = document.querySelector('input[name="description"]').value;

        var data = {
            nameInput: nameInput,
            descriptionInput: descriptionInput
        }

        updateCourse(id, data);
    }
    createBtn.innerHTML = 'Save';
}

function renderCourses(courses){
    // var listCoursesBlock = document.getElementById('list-courses');
    // var htmls = courses.map(function(course) {
    //     return `
    //     <li class = "course-item-${course.id}">
    //         <h4> ${course.name}</h4>
    //         <p>${course.description}</p>
    //         <button onclick = "handleDeleteCourse(${course.id})"> Xoá </button>
    //         <button onclick = "handleUpdateCourse(${course.id})"> Update </button>
    //     </li>
    //     `;
    // });
    // listCoursesBlock.innerHTML = htmls.join('');
    var listCourses = document.getElementById('list-courses');
    var htmls = courses.map(course => {
        return `
        <li id="course-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button class="course-btn-${course.id}" onclick="handleUpdateCourse(${course.id})">Update</button>
            <button onclick="handleDeleteCourse(${course.id})">Delete</button>
        </li>`
    });
    listCourses.innerHTML = htmls.join('');
}

