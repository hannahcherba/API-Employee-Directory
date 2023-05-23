const mainContainer= document.querySelector('.card-container');
let overlay= document.querySelector('.overlay-parent');
const modal=document.querySelector('.overlay');
// const overlayImg=document.getElementsByClassName('.avatar');
// const overlayTxt= document.getElementsByClassName('.overlay-txt');
// const card= document.getElementsByClassName('.card');
// const cardImg=document.getElementsByClassName('.main-avatar');
// const cardTxt= document.getElementsByClassName('.card-txt');
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
// .then(res => console.log(res.results))
.then(displayEmployees)
.catch(err => console.log(err))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" alt="${name.first}, an employee of the Awesome Startup company"/>
        <div class="card-txt">
            <h2>${name.first} ${name.last}</h2>
            <p>${email}</p>
            <p>${city}</p>
        </div>
    </div>
    `
    });
    mainContainer.innerHTML= employeeHTML;
};

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    // let { name, dob, phone, email, location: { city, street, state, postcode
    // }, picture } = employees[index];
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <button class="modal-close">X</button>
        <img class="avatar" src="${picture.large}" alt="${name.first}, an employee of the Awesome Startup company">
        <div class="overlay-txt">
            <h2>${name.first} ${name.last}</h2>
            <p>${email}</p>
            <p>${city}</p>
            <div></div>
            <p>${phone}</p>
            <p>${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modal.innerHTML = modalHTML;
    };

mainContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== mainContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

const modalClose= document.querySelector(".modal-close");
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });