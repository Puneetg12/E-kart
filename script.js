// variables
const cart=document.getElementById('cart');
const courses=document.getElementById('list-courses');
const listcourses=document.querySelector('#listcart tbody');
const emptycartbtn=document.getElementById('empty-cart');

// EventListeners
loadEventListeners()
function loadEventListeners(){
    // when add cart button is clicked
    courses.addEventListener('click', buycourse);
    // when a single courseb is removed from the cart/
    cart.addEventListener('click', deletecourse);
    // whwn empty cart btn is clicked
    emptycartbtn.addEventListener('click', emptycart);
    // after reload show data from local storage
    document.addEventListener('DOMContentLoaded', readlocalstorage);
}

// functions starts from here
// function that adds courses to cart
function buycourse(e){
    e.preventDefault();

    if(e.target.classList.contains('add-cart')){
        const path=e.target.parentElement.parentElement;
        readdatacourse(path);
               
    }

}
function readdatacourse(path){
    const infocourse={
        image:path.querySelector('img').src,
        title:path.querySelector('.name').textContent,
        price:path.querySelector('.discounted').textContent,
        id:path.querySelector('a').getAttribute('data-id')
    }
    insertincart(infocourse)
}
function insertincart(path){
    const row=document.createElement('tr')
    row.innerHTML=`
        <td>
            <img src="${path.image}">
        </td>
        <td>
        ${path.title}
    </td>
    <td>
    ${path.price}
</td>
<td class="cross">
<a href="#" class="deletecourse" data-id="${path.id}">x</a>
</td>
    `;
    listcourses.appendChild(row);
    savecourselocalstorage(path)

}
function deletecourse(e){
    e.preventDefault();
    let course,courseid;
    if(e.target.classList.contains('deletecourse')){
       e.target.parentElement.parentElement.remove()
       course=e.target.parentElement.parentElement
     
       courseid=course.querySelector('a').getAttribute('data-id');

        
    }
    deletecourselocalstorage(courseid)

}
function emptycart(){
    while(listcourses.firstChild){
        listcourses.removeChild(listcourses.firstChild)
    }
    emptylocalstorage();
    return false;
}
function savecourselocalstorage(path){
    let courses;
    courses=getCoursesLocalStorage();
    courses.push(path);
    localStorage.setItem('courses',JSON.stringify(courses));
}
function getCoursesLocalStorage(){
    let coursesLS;
    if(localStorage.getItem('courses')===null){
        coursesLS=[];
    }
    else{
        coursesLS=JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}

function readlocalstorage(){
    let coursesLS;
    coursesLS=getCoursesLocalStorage();
    coursesLS.forEach(function(path) {
        const row=document.createElement('tr')
    row.innerHTML=`
        <td>
            <img src="${path.image}">
        </td>
        <td>
        ${path.title}
    </td>
    <td>
    ${path.price}
</td>
<td class="cross">
<a href="#" class="deletecourse" data-id="${path.id}">x</a>
</td>
    `;
    listcourses.appendChild(row);
    });
}

function deletecourselocalstorage(course){
    let coursesLS;
    coursesLS=getCoursesLocalStorage();
    coursesLS.forEach(function(courseLS,index){
        if(courseLS.id===course){
            coursesLS.splice(index,1)
        }
    });
    localStorage.setItem('courses',JSON.stringify(coursesLS))
}
function emptylocalstorage(){
    localStorage.clear()
}




