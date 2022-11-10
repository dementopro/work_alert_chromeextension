import { getAllJobsBg } from '../Popup/api/api';
import { getDiff } from '../Popup/utils';
let prevJobs = [];

const checkNewJobs = () => {
  setInterval(() => {
    chrome.storage.local.get(['Users', 'keywords'], (result) => {
      if (result.Users && result.keywords) {
        let keywords = Object.values(result.keywords);
        if (keywords.length > 0) {
          getAllJobsBg(keywords).then((data) => {
            console.log('prevJob:', prevJobs);
            console.log('currJob:', data);
            let newJobs = getDiff(prevJobs, data).length;
            console.log({ newJobs });
            if (newJobs > 0) {
              chrome.notifications.create(
                {
                  title: `${newJobs} new jobs have been posted 🙌`,
                  iconUrl: chrome.runtime.getURL('icon-sm.png'),
                  message: 'Be first to apply! 👊',
                  type: 'basic',
                },
                (e) => {
                  console.log('result callback:', e);
                }
              );
              chrome.action.setBadgeText({
                text: newJobs.toString(),
              });
            }
            prevJobs = data;
          });
        }
      }
    });
  }, 5000);
};

checkNewJobs();
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ Users: null, keywords: [] });
  checkNewJobs();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SET_BADGE') {
    console.log('action:', request.from, request);
    chrome.action.setBadgeText({
      text: request.payload.toString(),
    });
  }
});
