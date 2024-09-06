// Create react project command.
// npm create vite@latest <package name>
// cd to package name
// npm install
// npm run dev
// ~ Machine Coding.
/*
 * Time management first 5 minutes ask questions.
 * get clear picture of what the questions is about what is being asked.
 * take paper and pen and draw sketch.
 * Learn coding from scratch.
 * see if they allow libraries like lodash and underscore.
 * before interview create a basic html and js skeleton so that we can save time.
 * Learn Editor Shortcuts.
 * DOM manipulation.
 * learn to how to fetch data in vanilla JavaScript.
 * local storage.
 * search sort, filter.
 * css flexbox.
 * responsiveness.
 * recursion.
 * Modular, reusable, specific tasks for function.
 * SOLID
 * scalable, readable.
 * No distractions
 * keep water beside.
 * keep white paper and pen.
 * minimum working web app.
 * Do something extra.
 * JSON.stringify() to check equality b/w dependencies b/w re-renders react custom hooks.
 * clicking any element that is a child of label tag will trigger a click on all the children of label tag
 *  - dark light mode /components/navbar.jsx > label element.
 * .mode-switch input:checked + .slider::before {
 * transform: translateX(20px);}
 * when input checkbox is check only then the block takes effect if unchecked then it won't
 * while generating dummy data always provide id to each item so its easy to map and provide key
 * e.clientX, e.clientY => get current cursor position
 * element.getBoundingClientRect() => get element's boundaries top bottom left right
 * to store to local storage: localStorage(key, JSON.stringify(obj))
 * to get from localstorage and use JSON.parse(localStorage.getItem('key'))
 * element.offSetTop : pixeles form top of the parent element. // same for offSetBottom
 */

// ~ Questions
/*
 * infinite scroll
 * carousel.
 * Comment section.
 * Todo list App. (drag and drop)
 * Food Ordering app.
 * E-mail web app. (email client)
 * Sudoku.
 * compare two products.
 * Github repo in -> google bookmark: revise daily -> machine coding folder.
 * chessboard
 * nested comments
 * toast component
 * drag and drop
 * tic tac toe
 * selectable grid
 * currency converter
 * quizz app
 * stepper
 * multi-select search
 * OTP login
 * Breadcrums
 * Dark and Light mode
 * Like button
 * job board
 * Grid Lights
 * LRU Cache
 * Password generator
 * progress bar
 * Pagination
 * file explorer
 * Timer
 * employee database
 * useEffect, useThrottle, useMemo
 * auto suggest
 * 
 *
 */

// TODO Methods to remember
/*
* plan what to code write rough outline on a paper then start code.
* get data from json (run live server) and use fetch(<path to json>);
* coursel transalteX

~ Employee DB
* querySelector(".xyz") class
* querySelector("#xyz") id
* querySelectorAll(".xyz").forEach()
* Extract data from promise :-> fetch(...).then(res => res.json()).then(r => do something with data.);
* Event delegation :- e.target --> e.target.id ...
* add class : tag.classList.add() | .remove().
* add Eventlistener : tag.addEventListener('click', fn) --> don't do fn().

! Shortcut for document.querySelector()
* const $ = document.querySelector.bind(document);
* const $$ = document.querySelectorAll.bind(document);
! usage
* const mainContent = $('.main-content');
* const externalLinks = $$('a[target="_blank"]');

! use entries entered in <form ....> tag.
* const formData = new FormData(employeeForm);
* const values = [...formData.entries()];
* values[0] label
* values[1] user input value

! Countdown clock.
* take only first two numbers: oninput="this.value=this.value.slice(0,this.maxLength)" // for type number.
* for type text just do <input type="text" maxLength="2"> // this will do.

! Pagination.
* 

* 

! EMI Calculator.
* restric value to 100 in input <input value={Math.min(0, Math.min(100, enteredValue))} />
* use regex for currency formatting.


! Progress Bar
*  Google search :- Accessability states and property.

! Like component
* Edge case if user clicks the button while it is fetching-> solution: disable button while fetching.

! OTP Login
* to move next
* r = useRef(null)
* <input ref ={r} />
* fn () => r.current.focus()

! Multi Select
* e.key == 'Backspace" => onKeyDown(e)/ onKeyUp(e) || doesn't work with onchange(e)
* e.keyCode == 8 ? then it is backspace



*/
