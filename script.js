'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//old school for loop
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

//replacing the old school for loop

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));

//creating a html element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics! <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('header');
header.append(message);

// deleting the element

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '110%';

message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 40 + 'px';

// smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

console.log(btnScrollTo);
console.log(section1);

btnScrollTo.addEventListener('click', function () {
  // get the coordinates of the element we want to scroll to
  // const s1coords = section1.getBoundingClientRect();
  // // console.log(s1coords);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// modern way to smooth scrolling

// event delegation
// selecting the element

const links = document.querySelectorAll('.nav__link');
// links.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // select element based on id
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // id.scrollIntoView({ behavior: 'smooth' });
//     // console.log('LINK');
//   });
// });

// // above function using arrow function
// links.forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// --------- event delegation ------
//  imagine adding event handler function to 1000 links
// impact performance not a clean solution
//  solution: putting a event handler to common parent

// --------------- VERY IMPORTANT ---------------------
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log(e.target);
//   const id = e.target.getAttribute('href');
//   // console.log(id);
//   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// });

const link = document.querySelector('.nav__links');

link.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// building tabbed component
const tab = document.querySelectorAll('.operations__tab');
// console.log(tab);
const tabContainer = document.querySelector('.operations__tab-container');
// console.log(tabContainer);
const tabsContent = document.querySelectorAll('.operations__content');

//attaching event handler on each tab
// tab.forEach(tab => tab.addEventListener('click', () => console.log('TAB')));
//above method would create copies of the function for many tabs
// we can apply event delegation

// event delegation
// select the common parent element
tabContainer.addEventListener('click', e => {
  // console.log('TAB CONTAINER PARENT');
  // console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return;

  // remove operations active tab from all the class
  tab.forEach(t => t.classList.remove('operations__tab--active'));

  // remove the tab content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // activate tab
  clicked.classList.add('operations__tab--active');

  // activate tab-content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// ----------------------------------
// menu fade animation
// 1. find the common parent for nav links and logo
// const navLink = document.querySelector('.nav__links');
// console.log(navLink);

const menu = document.querySelector('.nav');

// add event lisnter to the element

menu.addEventListener('mouseover', function (e) {
  // choose the element clicked.
  // not using closest() because they do not nav link <a> tag
  // do not have further child
  if (e.target.classList.contains('nav__link')) {
    // console.log('selected target element');
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);
    // select the log
    const logo = link.closest('.nav').querySelector('img');

    // check if the link is not current link and seth
    // the opacity
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

menu.addEventListener('mouseout', function (e) {
  // choose the element clicked.
  // not using closest() because they do not nav link <a> tag
  // do not have further child
  if (e.target.classList.contains('nav__link')) {
    // console.log('selected target element');
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log(siblings);
    // select the log
    const logo = link.closest('.nav').querySelector('img');

    // check if the link is not current link and seth
    // the opacity
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
