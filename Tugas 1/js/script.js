const btnDaftar = document.getElementById("btnDaftar");
const btnBatal = document.getElementById("btnBatal");
const loginPage = document.getElementById("loginPage");
const formNewList = document.getElementById("formNewList");

// FUNGSI BUKA TUTUP DAFTAR & LOGIN
function newList (close, open){
    loginPage.style.display = close;
    formNewList.style.display = open;
}

const formList = document.getElementById("formList")
formList.addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const validasiPassword = document.getElementById("validasiPassword").value;

    const users = getUsers();
    if(password === validasiPassword){
            users.push({
            email: email,
            password: password
        });

        saveUsers(users);
        alert("Akun berhasil ditambahkan")
        formList.reset();

        newList("flex", "none");
    } else{
        alert("⚠️ KEDUA PASSWORD TIDAK SAMA");
        return;
    }
    
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
        window.location.href = "dashboard.html"
    } else{
        alert("⚠️ EMAIL atau PASSWORD SALAH!")
    }

});


btnDaftar.addEventListener("click", ()=>{
    newList("none", "block");
    formLogin.reset();
});

btnBatal.addEventListener("click", ()=>{
    newList("flex", "none");
    formList.reset();
});

