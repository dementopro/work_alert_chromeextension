// ==================

import { getPostCall } from '../Popup/api/Apicalls';
// import localStorageService from '../Popup/api/localStorageService';

// chrome.storage.local.set({ 'test': "value", }, () => {
//   console.log('chrome saved locally ')
// })

// chrome.storage.local.get("test", (result) => {
//   console.log('got the test value : -', result )
// } )

// ==========

// chrome.runtime.onStartup.addListener(() => {
//   chrome.action.setBadgeText({
//     text: request.payload.toString(),
//   });
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   if (request.action === 'CHECK_JOBS') {
  //     console.log('action called');
  //     chrome.storage.local.get('Users', (result) => {
  //       if (result.Users) {
  //         chrome.notifications.create(Math.random().toString(), {
  //           message: 'User Login',
  //           iconUrl: chrome.runtime.getURL('icon-sm.png'),
  //           title: 'Testing Notification',
  //           type: 'basic',
  //         });
  //       }
  //     });
  //   }
  if (request.action === 'SET_BADGE') {
    chrome.action.setBadgeText({
      text: request.payload.toString(),
    });
  }
});
