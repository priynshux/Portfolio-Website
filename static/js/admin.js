// ── Live Preview on Add Form ────────────────────────────────
const nameInput  = document.getElementById('name');
const iconInput  = document.getElementById('icon');
const levelInput = document.getElementById('level');
const fillInput  = document.getElementById('fill');

const previewName  = document.getElementById('previewName');
const previewIcon  = document.getElementById('previewIcon');
const previewLevel = document.getElementById('previewLevel');
const previewFill  = document.getElementById('previewFill');

function updatePreview() {
  if (previewName)  previewName.textContent  = nameInput?.value  || 'Skill Name';
  if (previewIcon)  previewIcon.textContent  = iconInput?.value  || '⚡';
  if (previewLevel) previewLevel.textContent = levelInput?.value || 'Intermediate';
  if (previewFill)  previewFill.style.width  = (fillInput?.value || 70) + '%';
}

[nameInput, iconInput, levelInput, fillInput].forEach(el => {
  el?.addEventListener('input', updatePreview);
});

// ── Edit Modal ──────────────────────────────────────────────
const overlay   = document.getElementById('modalOverlay');
const modal     = document.getElementById('editModal');
const editForm  = document.getElementById('editForm');

function openEdit(id, name, icon, level, fill, color) {
  document.getElementById('editName').value  = name;
  document.getElementById('editIcon').value  = icon;
  document.getElementById('editLevel').value = level;
  document.getElementById('editFill').value  = fill;
  document.getElementById('editFillVal').textContent = fill;
  document.getElementById('editColor').value = color;
  editForm.action = `/admin/skills/edit/${id}`;
  overlay.classList.add('active');
  modal.classList.add('active');
}

function closeModal() {
  overlay.classList.remove('active');
  modal.classList.remove('active');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Search / Filter Table ───────────────────────────────────
const searchInput = document.getElementById('searchSkills');
const tableRows   = document.querySelectorAll('#skillsTable tbody tr');

searchInput?.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  tableRows.forEach(row => {
    const name = row.querySelector('.td-name')?.textContent.toLowerCase() || '';
    row.style.display = name.includes(q) ? '' : 'none';
  });
});

// ── Auto-hide flash messages ────────────────────────────────
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => {
    el.style.transition = 'opacity .5s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  }, 4000);
});
