/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = { github: "https://github.com/" };
const engineUrl = "http://chenxing.io:8080/search?q={query}";

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  return engineUrl.replace("{query}", value);
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchInput.focus();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    label: "~/general 🖋️",
    bookmarks: [
      { label: "刑搜", url: "http://chenxing.io:8080/" },
      { label: "emojipedia", url: "https://emojipedia.org/" },
      { label: "百度", url: "https://www.baidu.com/" },
      { label: "bing", url: "https://cn.bing.com/?ensearch=1" },
    ],
  },
  {
    label: "~/dev 💻",
    bookmarks: [
      { label: "github", url: "https://github.com/" },
      { label: "AUR", url: "https://aur.archlinux.org/" },
      { label: "hostinger", url: "https://hpanel.hostinger.com/" },
      { label: "npm", url: "https://www.npmjs.com/" },
    ],
  },
  {
    label: "~/work 💼",
    bookmarks: [
      { label: "天眼查", url: "https://www.tianyancha.com/" },
      { label: "金山文檔", url: "https://www.kdocs.cn/latest" },
      { label: "126網易郵", url: "https://www.126.com/" },
    ],
  },
  {
    label: "~/media 🕹️",
    bookmarks: [
      {
        label: "晉江",
        url: "https://www.jjwxc.net/bookbase.php?xx=3&sortType=1",
      },
      {
        label: "bilibili",
        url: "https://www.bilibili.com/",
      },
      {
        label: "微博",
        url: "https://weibo.com/",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
