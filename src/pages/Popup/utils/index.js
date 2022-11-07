export const uuid = () => {
  return new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
};

export const copy = (text) => {
  let textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
  alert('Copied');
};
