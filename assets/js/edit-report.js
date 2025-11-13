const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const report = reports.find(r => r.id === id);
    if (!report) {
      alert('Laporan tidak ditemukan!');
      window.location.href = 'reports.html';
    }
    // Tampilkan data lama ke form
    document.getElementById('facilityName').value = report.name;
    document.getElementById('description').value = report.description;
    document.getElementById('status').value = report.status;
    document.getElementById('edit-form').addEventListener('submit', function(e) {e.preventDefault();
      report.name = document.getElementById('facilityName').value;
      report.description = document.getElementById('description').value;
      report.status = document.getElementById('status').value;
      localStorage.setItem('reports', JSON.stringify(reports));
      alert('Perubahan berhasil disimpan!');
      window.location.href = 'report-detail.html?id=' + report.id;
    });
