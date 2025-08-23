export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
  });

export const getPasswordStrength = (password: string) => {
  let strengthIndicator = 0;

  if (/[A-Z]/.test(password)) {
    strengthIndicator++;
  }
  if (/[a-z]/.test(password)) {
    strengthIndicator++;
  }
  if (/[0-9]/.test(password)) {
    strengthIndicator++;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    strengthIndicator++;
  }
  return strengthIndicator;
};
