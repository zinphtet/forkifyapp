import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, newRecipe = undefined) {
  try {
    const fetchPro = newRecipe
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRecipe),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error(`Send data error ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     // const res = await fetch(url);
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     // console.log(res);
//     if (!res.ok) throw new Error(`Fetch data error ${res.status}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const sendJSON = async function (url, newRecipe) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newRecipe),
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // console.log(res);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`Send data error ${res.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
