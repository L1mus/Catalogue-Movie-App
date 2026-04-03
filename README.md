Link Deploy Vercel : https://catalogue-movie-app.vercel.app/

# Laporan Presentasi: Task Weekly 4 - Web Interaction & DOM

Dokumen ini merupakan rangkuman detail dari materi presentasi mengenai bagaimana JavaScript berinteraksi dengan browser untuk menciptakan halaman web yang dinamis.

---

## 📑 Daftar Konsep

### Konsep: Dasar Document Object Model (DOM)

#### **1. Mengenal Apa itu DOM**

Poin utama yang harus dpahami adalah DOM atau _Document Object Model_. Secara teknis, DOM adalah sebuah API web yang bertindak sebagai "jembatan" atau antarmuka pemrograman. Saat browser memuat halaman HTML, tidak hanya menampilkan teks, tetapi membangun model objek

Mengapa butuh ini? Karena tanpa DOM, JavaScript tidak punya cara untuk "berbicara" dengan HTML. DOM mengubah tag seperti `<div>` atau `<h1>` menjadi objek yang memiliki properti dan metode. Browser tidak melihat teks HTML sebagai tulisan biasa, tapi sebagai kumpulan objek yang bisa di ubah-ubah warnanya, ukurannya, atau isinya lewat kode.

#### **2. Struktur DOM Tree (Pohon Dokumen)**

Struktur DOM menyerupai silsilah keluarga disebut sebagai _DOM Tree_. Di puncaknya terdapat akar atau _Root_ yaitu `document`. Setiap elemen, atribut, dan potongan teks di dalam HTML direpresentasikan sebagai **Node** (simpul) dalam pohon ini.

Penting untuk dipahami bahwa hubungan antar elemen di sini bersifat hierarkis (Parent-Child). Misalnya, elemen `<body>` adalah orang tua (_parent_) dari elemen `<footer>`. Memahami struktur ini sangat krusial karena saat melakukan _DOM Traversal_ (penelusuran), bergerak maju mundur di antara dahan-dahan pohon ini untuk menemukan elemen yang ingin di ubah.

---

### Konsep: Metode dan Manipulasi DOM

#### **3. Seleksi dan Manipulasi Elemen**

Untuk mengubah sesuatu , harus "menangkap" elemennya terlebih dahulu. Di sini dapat menggunakan metode seleksi seperti `querySelector` atau `getElementById`. Setelah elemen didapat, bisa langsung di manipulasi, misalnya menggunakan `.textContent` untuk mengubah tulisan atau `.innerHTML` jika ingin memasukkan struktur HTML baru ke dalam elemen tersebut secara dinamis.

#### **4. Modifikasi Gaya dan Elemen Dinamis**

Selain konten juga bisa mengubah tampilan visual lewat JavaScript menggunakan `classList` atau `setAttribute`. Bahkan, dapat menciptakan elemen baru yang sebelumnya tidak ada di file HTML menggunakan fungsi `document.createElement()`. Contohnya, saat menekan tombol "Tambah Data" dan muncul baris baru secara otomatis, itulah hasil dari manipulasi elemen dinamis ini.

---

### Konsep: Lingkungan Browser & Perilaku Event

#### **5. Window vs Document**

Seringkali bingung membedakan keduanya. Singkatnya, `window` adalah objek global utama yang mewakili seluruh jendela atau tab browser—ia adalah "wadah" besarnya yang mengatur hal-hal seperti ukuran layar dan histori. Sedangkan `document` adalah bagian di dalam `window` yang khusus mewakili konten HTML-nya saja. Jadi, `document` sebenarnya adalah properti dari objek `window`.

#### **6. Event Propagation (Bubbling Phase)**

Kejadian seperti klik di website tidak diam di satu tempat, melainkan merambat seperti gelombang air yang tenang saat terkena tetesan air tetesan air ini bisa di artikan juga sebagai event misal klik dan lainnya. Dalam fase _Bubbling_, sebuah event yang terjadi pada elemen terdalam akan memancar keluar hingga ke elemen induknya. Pengetahuan ini sangat krusial agar bisa mengatur urutan eksekusi perintah jika terdapat banyak elemen yang saling bertumpuk di satu area.

---

### Konsep: Komunikasi Data (HTTP Methods)

#### **7. Metode GET (Membaca Data)**

Metode **GET** digunakan saat ingin mengambil atau membaca informasi dari server. Karakteristik utamanya adalah data yang dikirim akan terlihat langsung di URL. Karena sifatnya yang terbuka, metode ini sangat cepat namun tidak aman digunakan untuk mengirim data sensitif seperti kata sandi.

#### **8. Metode POST (Mengirim Data)**

Kebalikannya, jika ingin mengirim data baru atau melakukan registrasi, dapat menggunakan metode **POST**. Data disimpan secara tersembunyi di dalam _Body_ permintaan. Ini membuatnya jauh lebih aman untuk data privat dan mampu menampung kapasitas data yang jauh lebih besar, seperti unggahan file.
