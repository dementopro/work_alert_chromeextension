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

export const getDiff = (array1, array2) => {
  const isSameUser = (obj1, obj2) => obj1.link === obj2.link;

  const onlyInLeft = (left, right, compareFunction) =>
    left.filter(
      (leftValue) =>
        !right.some((rightValue) => compareFunction(leftValue, rightValue))
    );

  const onlyInA = onlyInLeft(array1, array2, isSameUser);
  const onlyInB = onlyInLeft(array2, array1, isSameUser);

  const result = [...onlyInA, ...onlyInB];
  return result;
};

export const getUserInfoFromStorage = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get('Users', async (result) => {
      resolve(result.Users);
    });
  });
};
