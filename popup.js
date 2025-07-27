
document.getElementById("startDate").addEventListener("change", () => {
    const endDateInput = document.getElementById("endDate");
    endDateInput.showPicker?.(); // g?i popup ch?n ng?y
    endDateInput.focus();        // ?? c? tab highlight
});

document.getElementById("submitBtn").addEventListener("click", async () => {
    console.log("!!start!!");
    const zacCode = document.getElementById("zacCode").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    console.log("zac code: " + zacCode);
    console.log("start date: " + startDate);
    console.log("end date: " + endDate);
    if (!zacCode || !startDate || !endDate) {
        alert("Vui l?ng nh?p ??y ?? th?ng tin gi?p c?i ?iiii.");
        return;
    }

    console.log("Pass input");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("Pass 1");

    const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [zacCode, startDate, endDate],
        func: async (zacCode, startDate, endDate) => {
            console.log("runAutomation start");

            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

            function formatDate(dateObj) {
                const yyyy = dateObj.getFullYear();
                const mm = ('0' + (dateObj.getMonth() + 1)).slice(-2);
                const dd = ('0' + dateObj.getDate()).slice(-2);
                return `${yyyy}/${mm}/${dd}`;
            }

            function waitForDomLoad() {
                return new Promise(resolve => {
                    if (document.readyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('load', () => resolve(), { once: true });
                    }
                });
            }

            function waitForPageReload() {
                return new Promise(resolve => {
                    window.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
                });
            }

            async function loopDates() {
                console.log("loopDates start");
                const start = new Date(startDate);
                const end = new Date(endDate);

                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dayOfWeek = d.getDay(); // 0 = Ch? nh?t, 6 = Th? b?y
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        continue;
                    }

                    const currentDate = formatDate(d);
                    await waitForDomLoad();
                    console.log("Running automation for:", currentDate);

                    console.log("SubmitDateNippouChange(currentDate);");
                    // // if (typeof SubmitDateNippouChange === 'function') {
                    // //     SubmitDateNippouChange(currentDate);
                    // // } else {
                    // //     console.error("SubmitDateNippouChange is not defined");
                    // //     break;
                    // // }

                    await delay(1000);

                    const input = document.querySelector('input[name="code_project1"]');
                    if (input) {
                        input.value = zacCode;
                        input.dispatchEvent(new Event('blur'));
                    }

                    await delay(1000);

                    const button = document.querySelector('#button7');
                    if (button) {
                        button.click();
                    }

                    await delay(1000);

                    // await waitForPageReload();
                }

                console.log("loopDates end");
            }

            await loopDates();
            console.log("runAutomation end");
        }
    });

    console.log("Script executed, result:", result);


    console.log("!!end!!");
});

// function runAutomation(zacCode, startDate, endDate) {
//     console.log("runAutomation start");
//     const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//     function formatDate(dateObj) {
//         const yyyy = dateObj.getFullYear();
//         const mm = ('0' + (dateObj.getMonth() + 1)).slice(-2);
//         const dd = ('0' + dateObj.getDate()).slice(-2);
//         return `${yyyy}/${mm}/${dd}`;
//     }

//     async function loopDates() {
//         console.log("loopDates start");
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//             const dayOfWeek = d.getDay(); // 0 = Ch? nh?t, 6 = Th? b?y
//             if (dayOfWeek === 0 || dayOfWeek === 6) {
//                 continue; // B? qua T7 v? CN
//             }
//             const currentDate = formatDate(d);

//             await waitForDomLoad();
//             console.log("Running automation for:", currentDate);

//             // Change date
//             if (typeof SubmitDateNippouChange === 'function') {
//                 SubmitDateNippouChange(currentDate);
//             } else {
//                 console.error("SubmitDateNippouChange is not defined");
//                 break;
//             }

//             // Wait a bit for redirect (or override as needed)
//             await delay(2000);

//             // Fill ZAC code
//             const input = document.querySelector('input[name="code_project1"]');
//             if (input) {
//                 input.value = zacCode;
//                 input.dispatchEvent(new Event('blur'));
//             }

//             // Click ämíË
//             const button = document.querySelector('#button7');
//             if (button) {
//                 button.click();
//             }

//             // Wait for next page load
//             await waitForPageReload();
//         }
//         console.log("loopDates end");
//     }

//     function waitForDomLoad() {
//         return new Promise(resolve => {
//             if (document.readyState === 'complete') {
//                 resolve();
//             } else {
//                 window.addEventListener('load', () => resolve(), { once: true });
//             }
//         });
//     }

//     function waitForPageReload() {
//         return new Promise(resolve => {
//             window.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
//         });
//     }

//     loopDates();
//     console.log("runAutomation end");
// }



// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById("clickBtn").addEventListener("click", function () {
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             const currentTab = tabs[0];

//             // Redirect tab hi?n t?i ??n Facebook
//             chrome.tabs.update(currentTab.id, { url: "https://www.facebook.com" });

//             // Sau 2 gi?y, redirect ti?p ??n YouTube (tab n?y v?n l? tab hi?n t?i)
//             setTimeout(() => {
//                 chrome.tabs.update(currentTab.id, { url: "https://www.youtube.com" });
//             }, 2000);
//         });
//     });
// });


// /*
// // change date
// SubmitDateNippouChange('2025/06/20');

// // nhap zac code
// $('input[name="code_project1"]').val('1800152').trigger('blur');   // code_project1 gi? nguy?n, 1800152 l? c?i input zac code

// // click  ämÅ@íË 
// $('#button7').trigger('click');
// */