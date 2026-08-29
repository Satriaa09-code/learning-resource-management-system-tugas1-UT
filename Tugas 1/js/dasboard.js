//====================
//  DASHBOARD PAGE
//====================
const sideBar = document.getElementById("displaySideBar");
const btnHamburger = document.getElementById("btnHamburger");

btnHamburger.addEventListener("click", ()=>{
    sideBar.classList.toggle("hide");
});
