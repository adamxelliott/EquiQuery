chrome.runtime.onInstalled.addListener(()=> {
    chrome.contextMenus.create({
        id: "RacingPost",
        title: "Search RP for %s",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "NetKeiba",
        title: "Search NK for %s",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "Equibase",
        title:"Search Equibase for %s",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "Pedi",
        title: "Search PedigreeQuery for %s",
        contexts: ["selection"]
    });
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const query = encodeURIComponent(info.selectionText);

  switch (info.menuItemId) {
    case "RacingPost":
      chrome.tabs.create({
        url: `https://www.racingpost.com/search-results/?keyword=${query}`
      });
      break;

    case "NetKeiba":
      chrome.tabs.create({
        url: `https://en.netkeiba.com/db/horse/horse_list.html?type=db&word=${query}&submit=Search`
      });
      break;

    case "Equibase":
        const html = `
            <form id="searchForm" action="https://www.equibase.com/profiles/Results.cfm" method="POST">
                <input type="hidden" name="type" value="Horse">
                <input type="hidden" name="searchType" value="Horse">
                <input type="hidden" name="horseName" value="${query}">
            </form>
            <script>document.getElementById('searchForm').submit()</script>
        `;
        const encoded = "data:text/html;charset=utf-8," + encodeURIComponent(html);

        chrome.tabs.create({ url: encoded });
      break;

    case "Pedi":
      chrome.tabs.create({
        url: `https://www.pedigreequery.com/cgi-bin/new/check2.cgi?query_type=check&search_bar=horse&wsid=1753184686&h=${query}&g=5&inbred=Standard&x2=n&chefList=0`
      });
      break;
  }
});

