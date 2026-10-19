export function openPopup({ path, name, width, height }) {
  const features = `width=${width},height=${height},location=no,resizable=yes,scrollbars=yes,status=yes`;
  const win = window.open(path, name, features);
  win?.focus();
  return win;
}
