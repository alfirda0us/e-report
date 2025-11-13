const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const reports = JSON.parse(localStorage.getItem('reports')) || [];
const report = reports.find(r => r.id === id);

if (report) {
  // Populate the fields
  document.getElementById('facilityName').innerText = report.name;
  document.getElementById('description').innerText = report.description;
  document.getElementById('status').innerText = report.status;
  document.getElementById('date').innerText = report.date;

  // Set report title
  document.getElementById('reportTitle').innerText = `Detail Laporan: ${report.name}`;

  // Set status badge
  const statusElement = document.getElementById('reportStatus');
  const statusClass = report.status === "Selesai" ? "bg-blue-500/20 text-blue-400" :
                     report.status === "Diproses" ? "bg-blue-500/20 text-blue-400" :
                     "bg-blue-500/20 text-blue-400";
  statusElement.className = `inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusClass}`;
  statusElement.innerText = report.status;

  // Set image if exists
  const imageContainer = document.getElementById('reportImage');
  if (report.image) {
    imageContainer.innerHTML = `<img src="${report.image}" class="w-full h-64 object-cover rounded mb-6" alt="Foto Fasilitas">`;
  }

  // Fix edit button href
  document.getElementById('editBtn').href = `edit-report.html?id=${report.id}`;

} else {
  document.querySelector('main').innerHTML = '<p class="text-center text-white">Laporan tidak ditemukan.</p>';
}

function deleteReport() {
  if (!confirm("Yakin ingin menghapus laporan ini?")) return;

  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  const updatedReports = reports.filter(r => r.id !== id);
  localStorage.setItem('reports', JSON.stringify(updatedReports));

  alert("Laporan berhasil dihapus!");
  window.location.href = 'reports.html';
}
