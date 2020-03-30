export default (file) => {
  if (!file) return;
  return file.includes('png') || file.includes('jpg');
};
