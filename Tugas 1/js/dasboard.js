//====================
//  DASHBOARD PAGE
//====================
const sideBar = document.getElementById("displaySideBar");
const btnHamburger = document.getElementById("btnHamburger");

btnHamburger.addEventListener("click", ()=>{
    sideBar.classList.toggle("hide");
});

//DROPDOWN
const dropdown = document.querySelector(".dropdown");
const btnLaporan = document.getElementById("btnLaporan");
const dropDownLaporan = document.getElementById("dropDownLaporan");
btnLaporan.addEventListener("click", ()=>{
    dropDownLaporan.style.display = "block";
})

dropdown.addEventListener("mouseleave", ()=>{
        dropDownLaporan.style.display = "none";
});

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


//Menampilkan dashboard data buku pada tabel website
const tabelBuku = document.getElementById("tabelBuku");
dataBahanAjar.forEach(function(buku){
    const baris = document.createElement("tr");

    baris.innerHTML = `
            <td>${buku.kodeBarang}</td> 
            <td>${buku.namaBarang}</td> 
            <td>${buku.jenisBarang}</td> 
            <td>${buku.edisi}</td>
            <td><img src="assets/${buku.cover}"></td>
            `;

    tabelBuku.appendChild(baris);

});


//Menampilkan semua informasi stok bahan ajar
const dataStocksBa = document.getElementById("dataStockBa");
dataBahanAjar.forEach(function(buku){
    const baris = document.createElement("tr");

    baris.innerHTML = `
            <td>${buku.kodeLokasi}</td>
            <td>${buku.kodeBarang}</td>
            <td>${buku.namaBarang}</td>
            <td>${buku.jenisBarang}</td>
            <td>${buku.edisi}</td>
            <td>${buku.stok}</td>
            <td><img src="assets/${buku.cover}"></td>
    `;

    dataStocksBa.appendChild(baris);
});



const formCari = document.getElementById("formCari");
const popups = document.getElementById("popups");
const popupPengiriman = document.getElementById("popupPengiriman");
const popupDataKosong = document.getElementById("popupDataKosong");
const popupTambahStok = document.getElementById("popupTambahStok");

//DISPLAY POPUP
function manajemenPopup(d1, d2, d3){
    popups.style.display = "flex";
    popupPengiriman.style.display = d1;
    popupDataKosong.style.display = d2;
    popupTambahStok.style.display = d3;
}


const warnaStatus = document.getElementById("containerStatus");
function statusPengiriman(c1, c2){
    warnaStatus.style.backgroundColor = c1;
    warnaStatus.style.color = c2;
}

//MENCARI PENGIRIMAN ==========================================================================================
formCari.addEventListener("submit",function(e){
    e.preventDefault();
    
    const nomorDeliv = document.getElementById("nomorDeliv").value;
    var data = dataTracking[nomorDeliv];

    if(data){
        manajemenPopup("block", "none", "none");

        const nama = document.getElementById("namaPopup").textContent = data.nama;
        const tanggalKirim = document.getElementById("tanggalKirimPopup").textContent = data.tanggalKirim;
        const ekspedisi = document.getElementById("ekspedisiPopup").textContent = data.ekspedisi;
        const total = document.getElementById("totalPopup").textContent = data.total;
        const paket = document.getElementById("paketPopup").textContent = data.paket;
        const status = document.getElementById("statusPopup").textContent = data.status;

        if(status === "Dikirim"){    
            statusPengiriman("royalBlue", "white");

        } else if(status === "Dalam Perjalanan"){
            statusPengiriman("orange", "white")

        } else if(status === "Selesai"){
            statusPengiriman("green", "white")
        }

        var perjalanan = data.perjalanan;
        var hasil = "";
        for(var i = 0; i < perjalanan.length; i++){
            hasil += `
                <div class="item-perjalanan">
                <div class="titik"></div>
                <div class="isi-perjalanan">
                    <h4>${perjalanan[i].keterangan}</h4>
                    <p>${perjalanan[i].waktu}</p>
                </div>
                </div>
            `;
        };
        document.getElementById("listPerjalanan").innerHTML = hasil;
        formCari.reset();

    } else{
        manajemenPopup("none", "flex", "none");
        setTimeout(() => {
            popups.style.display = "none";
        }, 1500);
    }
});


//TOMBOL X PADA POPUP PENGIRIMAN  ===========================================================
const btnPopup = document.getElementById("btnPopup");
btnPopup.addEventListener("click", ()=>{
    popups.style.display = "none";
});


//NAVIGASI ==================================================================================
const btnDashboard = document.getElementById("btnDashboard");
const btnStockBa = document.getElementById("btnStockBa");
const bodyDashboard = document.getElementById("bodyDashboard");
const titleHeader = document.getElementById("titleHeader");
const bodyStock = document.getElementById("bodyStock");

function navigasi(db,sb){
    bodyDashboard.style.display = db;
    bodyStock.style.display = sb;
}

function title(title){
    titleHeader.textContent = title;
}

btnDashboard.addEventListener("click", ()=>{
    navigasi("flex", "none");
    title("Dashboard");
    
})

btnStockBa.addEventListener("click", ()=>{
    navigasi("none", "flex")
    title("Informasi Bahan Ajar");

});

//POPUP TAMBAH STOK =======================================================================
const btnTambahStok = document.getElementById("btnTambahStok");
const btnBatalStok = document.getElementById("btnBatalStok");
const tabelTambahStok = document.getElementById("tabelTambahStok");

btnBatalStok.addEventListener("click", ()=>{
    popups.style.display = "none";
});

btnTambahStok.addEventListener("click", ()=>{
    manajemenPopup("none", "none", "flex");
});

tabelTambahStok.addEventListener("submit", (e)=>{

    const lokasi = document.getElementById("kdLokasi").value;
    const kdBarang = document.getElementById("kdBarang").value;
    const nama = document.getElementById("nama").value;
    const jenis = document.getElementById("jenis").value;
    const edisi = document.getElementById("edisi").value;
    const stok = document.getElementById("stok").value;
    const format = document.getElementById("format").value;

    e.preventDefault();

    const dataStock = dataBahanAjar;
    const dataBaru = {
        kodeLokasi: lokasi,
        kodeBarang: kdBarang,
        namaBarang: nama,
        jenisBarang: jenis,
        edisi: edisi,
        stok: stok,
        cover: format
    }

    tabelTambahStok.reset();

    dataStock.push(dataBaru);
    const baris = document.createElement("tr");

    baris.innerHTML = `
            <td>${dataBaru.kodeLokasi}</td>
            <td>${dataBaru.kodeBarang}</td>
            <td>${dataBaru.namaBarang}</td>
            <td>${dataBaru.jenisBarang}</td>
            <td>${dataBaru.edisi}</td>
            <td>${dataBaru.stok}</td>
            <td><img src="assets/img/${dataBaru.cover}"></td>
    `;
    dataStocksBa.appendChild(baris);

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${dataBaru.kodeBarang}</td> 
            <td>${dataBaru.namaBarang}</td> 
            <td>${dataBaru.jenisBarang}</td> 
            <td>${dataBaru.edisi}</td>
            <td><img src="assets/img/${dataBaru.cover}"></td>
            `;
    tabelBuku.appendChild(row);
    popups.style.display = "none";
    alert("✅Data berhasil ditambahkan");

    
});

