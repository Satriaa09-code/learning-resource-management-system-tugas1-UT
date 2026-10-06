//====================
//  DASHBOARD PAGE
//====================
const sideBar = document.getElementById("displaySideBar");
const btnHamburger = document.getElementById("btnHamburger");

btnHamburger.addEventListener("click", ()=>{
    sideBar.classList.toggle("hide");
});

//DROPDOWN
const btnLaporan = document.getElementById("btnLaporan");
const dropDownLaporan = document.getElementById("dropDownLaporan")
btnLaporan.addEventListener("click", ()=>{
    dropDownLaporan.style.display = "block";
})

//UCAPAN
const sekarang = new Date();
const jam = sekarang.getHours();

let ucapan;

if(jam >= 5 && jam < 12){
    ucapan = "Selamat Pagi";
} else if(jam >= 12 && jam < 15 ){
    ucapan = "Selamat Siang";
} else if(jam >= 15 && jam < 18){
    ucapan = "Selamat Sore"
} else{
    ucapan = "Selamat Malam"
}

document.getElementById("ucap").textContent = ucapan;

const tabelBuku = document.getElementById("tabelBuku");
dataBahanAjar.forEach(function(buku){
    const baris = document.createElement("tr");

    baris.innerHTML = `
            <td>${buku.kodeBarang}</td> 
            <td>${buku.namaBarang}</td> 
            <td>${buku.jenisBarang}</td> 
            <td>${buku.edisi}</td>
            <td>${buku.stok}</td>
            <td><img src="assets/img/${buku.cover}"></td>
            `;

    tabelBuku.appendChild(baris);

});
