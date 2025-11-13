const container = document.getElementById("reportList")
const searchInput = document.getElementById("searchInput")
const filterStatus = document.getElementById("filterStatus")
const applyFilterBtn = document.getElementById("applyFilter")
const clearBtn = document.getElementById("clearFilter")
let reports = JSON.parse(localStorage.getItem("reports")) || []

function loadReports() {
  const reports = JSON.parse(localStorage.getItem("reports")) || []
  renderReports(reports)
}

function renderReports(reports) {
  const reportList = document.getElementById("reportList")
  reportList.innerHTML = ""
  if (reports.length === 0) {
    reportList.innerHTML = `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-400">
        <div class="text-lg text-white mb-2">Tidak ada laporan</div>
        <p>Mulai dengan membuat laporan baru untuk melacak fasilitas sekolah.</p>
      </div>
    `
    return
  }

  reports.forEach((r) => {
    const statusClass =
      r.status === "Selesai"
        ? "bg-blue-500/20 text-blue-400"
        : r.status === "Diproses"
          ? "bg-blue-500/20 text-blue-400"
          : "bg-blue-500/20 text-blue-400"

    reportList.innerHTML += `
      <div class="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer">
        ${r.image ? `<img src="${r.image}" class="w-full h-48 object-cover rounded mb-4" alt="Foto Fasilitas">` : ""}
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-white flex-1">${r.name}</h3>
          <span class="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${statusClass}">
            ${r.status}
          </span>
        </div>
        <p class="text-slate-400 mb-4 text-sm line-clamp-2">${r.description}</p>
        <div class="flex justify-between items-center pt-4 border-t border-slate-700 text-xs text-slate-400">
          <span>ID: ${r.id}</span>
          <div class="flex gap-2 items-center">
            <a href="report-detail.html?id=${r.id}" class="bg-transparent border border-slate-700 text-slate-400 px-3 py-1 rounded hover:border-blue-500 hover:text-blue-500 transition-all no-underline text-xs">Detail</a>
            <a href="edit-report.html?id=${r.id}" class="bg-transparent border border-slate-700 text-slate-400 px-3 py-1 rounded hover:border-blue-500 hover:text-blue-500 transition-all no-underline text-xs">Edit</a>
            <button onclick="deleteReport(${r.id})" class="bg-transparent border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500/10 transition-all text-xs cursor-pointer">Hapus</button>
          </div>
        </div>
      </div>
    `
  })
}

function applyFilter() {
  const searchValue = searchInput.value.toLowerCase()
  const filterValue = filterStatus.value

  const filtered = reports.filter(
    (r) => r.name.toLowerCase().includes(searchValue) && (filterValue === "" || r.status === filterValue),
  )

  document.getElementById("filterStatusInfo").innerText = `Filter diterapkan: ${filtered.length} laporan ditemukan`

  renderReports(filtered)
}

applyFilterBtn.addEventListener("click", applyFilter)
clearBtn.addEventListener("click", () => {
  searchInput.value = ""
  filterStatus.value = ""
  loadReports()
})

function deleteReport(id) {
  if (!confirm("Yakin ingin menghapus laporan ini?")) return

  reports = reports.filter((report) => report.id !== id)
  localStorage.setItem("reports", JSON.stringify(reports))

  alert("Laporan berhasil dihapus!")
  loadReports()
}

loadReports()
