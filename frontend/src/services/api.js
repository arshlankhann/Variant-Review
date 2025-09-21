const API_BASE = import.meta?.env?.VITE_API_BASE_URL || '';

export async function uploadVcf(file) {
  const formData = new FormData();
  formData.append('vcf', file);
  const res = await fetch(`${API_BASE}/api/upload-vcf`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Upload failed');
  }
  return res.json();
}

export async function getVariants() {
  const res = await fetch(`${API_BASE}/api/variants`);
  if (!res.ok) throw new Error('Failed to fetch variants');
  return res.json();
}

export async function updateVariantStatus(variantId, status) {
  const res = await fetch(`${API_BASE}/api/variants/${variantId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}

export async function generateReport(approvedVariants) {
  const res = await fetch(`${API_BASE}/api/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approvedVariants })
  });
  if (!res.ok) throw new Error('Failed to generate report');
  return res.json();
}
