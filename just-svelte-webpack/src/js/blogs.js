import "$css/blogs.less";

import Blogs from "$templates/Blogs.svelte";
import Header from "$components/Header.svelte";
import Dialogs from "$components/Dialogs.svelte";
import Footer from "$components/Footer.svelte";
new Header({
  target: document.getElementById("app-header"),
});
new Dialogs({
  target: document.getElementById("app-dialogs"),
});
new Footer({
  target: document.getElementById("app-footer"),
});
new Blogs({
  target: document.getElementById("blogs-app"),
});
