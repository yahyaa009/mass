// FORM REGISTRASI
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nama = document.getElementById('inputNama').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const userData = { nama, email, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("✅ Registrasi berhasil! Silakan login.");
    window.location.href = "index.html";
  });
}

// FORM LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMsg = document.getElementById("loginError");

    errorMsg.classList.add("hidden");
    errorMsg.classList.remove("opacity-100");
    errorMsg.classList.add("opacity-0");

    const user = localStorage.getItem(email);
    if (!user) {
      return showLoginError("❌ Akun tidak ditemukan. Silakan daftar.");
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.password !== password) {
      return showLoginError("❌ Password salah. Coba lagi.");
    }

    // Simpan nama/email ke localStorage & pindah
    localStorage.setItem("loggedInUser", JSON.stringify(parsedUser));
    window.location.href = "success.html";
  });
}

function showLoginError(message) {
  const errorMsg = document.getElementById("loginError");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden", "opacity-0");
  errorMsg.classList.add("opacity-100");
}
    const data = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!data) window.location.href = "index.html"; // Paksa kembali ke login

    // Tampilkan data
    document.getElementById("namaOutput").innerText = data.nama;
    document.getElementById("emailOutput").innerText = data.email;
    document.getElementById("tanggalOutput").innerText = new Date().toLocaleDateString("id-ID");

    function cetakPDF() {
      const element = document.getElementById("outputArea");
      const opt = {
        margin: 1,
        filename: `Bukti_Pendaftaran_${data.nama}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }