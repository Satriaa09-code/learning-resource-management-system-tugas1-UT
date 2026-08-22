const btnDaftar = document.getElementById("btnDaftar");
const btnBatal = document.getElementById("btnBatal");
const loginPage = document.getElementById("loginPage");
const formNewList = document.getElementById("formNewList");

// FUNGSI BUKA TUTUP DAFTAR & LOGIN
function newList (close, open){
    loginPage.style.display = close;
    formNewList.style.display = open;
}

btnDaftar.addEventListener("click", ()=>{
    newList("none", "block");
});

btnBatal.addEventListener("click", ()=>{
    newList("flex", "none");
});

const formList = document.getElementById("formList")
formList.addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    users.push({
        email: email,
        password: password
    });
    saveUsers(users);
    alert("Akun berhasil ditambahkan")
    formList.reset();

    newList("flex", "none");
});

const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", function(event){
    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const users = getUsers();

    const user = users.find(function(user){
        return user.email === email && user.password === password;
    });

    if(user){
        alert("✅ LOGIN BERHASIL!")
    } else{
        alert("⚠️EMAIL atau PASSWORD [SALAH]!")
    }

});
