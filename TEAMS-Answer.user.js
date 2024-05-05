// ==UserScript==
// @name         TEAMS Show Answer
// @namespace    http://tampermonkey.net/
// @version      v1.0.0
// @description  專門為翰林雲端學院設計的顯示答案Tempermonkey「腳本」
// @author       Know Scratcher
// @match        https://*.teamslite.com.tw/student/exam.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teamslite.com.tw
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var get_inter = setInterval(get, 1000);
  function get() {
    let ans = "";
    let choices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let diff;
    let processed = 0;
    Array.from(
      document.getElementsByClassName(
        "btn btn-default responsive_btn circle20Button doubtButton"
      )
    ).forEach((ids) => {
      let id = ids.getAttribute("data-question");
      fetch(`https://cysh.teamslite.com.tw/_id/${id}/Question`)
        .then(function (response) {
          return response.json();
        })
        .then(function (question) {
          diff = question["result"][0]["difficult"];
          let raw_ans = [];
          ans += id.slice(id.length-1)+":";
          question["result"][0]["answers"].forEach((element) => {
            ans += choices[element];
            console.log(ans)
          });
          ans += "<br>";
          processed++;
          //clearInterval(get_inter);
          if (processed == Array.from(document.getElementsByClassName("btn btn-default responsive_btn circle20Button doubtButton")).length) {
            try {
                document.getElementById("diff").innerHTML = `難易度:${
                  diff < -1.5
                    ? "易"
                    : diff < 0
                    ? "偏易"
                    : diff < 1.5
                    ? "中"
                    : diff < 3
                    ? "偏難"
                    : "難"
                }(${diff})`;
              } catch (e) {
                document.getElementsByClassName(
                  "media-heading margin-bottom-20"
                )[0].innerHTML =
                  document.getElementsByClassName("media-heading margin-bottom-20")[0]
                    .innerHTML +
                  `<p id='diff'>難易度:${
                    diff < -1.5
                      ? "易"
                      : diff < 0
                      ? "偏易"
                      : diff < 1.5
                      ? "中"
                      : diff < 3
                      ? "偏難"
                      : "難"
                  }(${diff})</p>`;
              }
              if (
                document
                  .getElementById("qbody")
                  .getElementsByClassName("media-heading margin-bottom-20")[0]
                  .getElementsByClassName("btn green").length == 0
              ) {
                document
                  .getElementById("qbody")
                  .getElementsByClassName(
                    "media-heading margin-bottom-20"
                  )[0].innerHTML += `<a class='btn green' onclick="try{document.getElementById('ans').innerHTML = '${ans}';}catch (e) {document.getElementsByClassName('media-heading margin-bottom-20')[0].innerHTML = document.getElementsByClassName('media-heading margin-bottom-20')[0].innerHTML+'<p id=ans>'+'${ans}'+'</p>';}">顯示答案</a>`;
              }
          }
          setTimeout(function(){},200);
        });

    });

    console.log(ans)

  }

  // Your code here...
})();
