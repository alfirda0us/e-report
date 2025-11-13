function updateDashboard() {
  const reports = JSON.parse(localStorage.getItem("reports")) || []
  const total = reports.length
  const baru = reports.filter((r) => r.status === "Baru").length
  const proses = reports.filter((r) => r.status === "Diproses").length
  const selesai = reports.filter((r) => r.status === "Selesai").length
  document.getElementById("totalReports").innerText = total
  document.getElementById("newReports").innerText = baru
  document.getElementById("processReports").innerText = proses
  document.getElementById("doneReports").innerText = selesai

  const recentReportsContainer = document.getElementById("recentReports")
  if (reports.length === 0) {
    recentReportsContainer.innerHTML = `
      <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-400">
        <p>Belum ada laporan. Mulai dengan membuat laporan baru.</p>
      </div>
    `
    return
  }

  const recentReports = reports.slice(-3).reverse()
  recentReportsContainer.innerHTML = recentReports
    .map((report, index) => {
      const statusClass =
        report.status === "Baru"
          ? "bg-blue-500/20 text-blue-400"
          : report.status === "Diproses"
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-500/20 text-blue-400"
      return `
        <div class="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 hover:shadow-xl transition-all mb-5">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-white">${report.name}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusClass}">${report.status}</span>
          </div>
          <p class="text-slate-400 mb-4 text-sm line-clamp-2">${report.description.substring(0, 100)}...</p>
          <div class="flex justify-between items-center pt-4 border-t border-slate-700 text-xs text-slate-400">
            <span>ID: ${report.id}</span>
            <div class="flex gap-2">
              <a href="report-detail.html?id=${report.id}" class="bg-transparent border border-slate-700 text-slate-400 px-3 py-1 rounded hover:border-blue-500 hover:text-blue-500 transition-all no-underline">Lihat</a>
              <a href="edit-report.html?id=${report.id}" class="bg-transparent border border-slate-700 text-slate-400 px-3 py-1 rounded hover:border-blue-500 hover:text-blue-500 transition-all no-underline">Edit</a>
            </div>
          </div>
        </div>
      `
    })
    .join("")
}
updateDashboard()
