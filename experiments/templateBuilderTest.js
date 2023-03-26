import { templateBuilder } from "./template-builder/index.js";

console.log(
  templateBuilder()
    .tag("a")
    .prop("href", "https://google.com")
    .content(
      templateBuilder()
        .tag("p")
        .prop("class", "text-lg text-grey text-align-right")
        .content("Google is boring")
        .build()
    )
    .build()
);

/* <a href="https://google.com">
    <p class="p-paragraph p-grey text-align">
      Google is boring
    </p>
  </a>
*/

console.log(
  templateBuilder()
    .tag("img")
    .prop("src", "myImage.png")
    .prop("class", "repeat center")
    .content("cannot add content so some warning should show")
    .build()
);

/* <img src="myImage.png" class="some classes lmao center" /> */

console.log(
  templateBuilder()
    .tag("aside")
    .prop("class", "d-flex flex-col")
    .content(
      templateBuilder()
        .tag("p")
        .prop("class", "flex-grow mb-2")
        .content("This is the content")
        .build(),
      3
    )
    .build()
);

/*
<aside class="d-flex flex-col">
  <p class="flex-grow mb-2">This is the content</p>
  <p class="flex-grow mb-2">This is the content</p>
  <p class="flex-grow mb-2">This is the content</p>
</aside>
*/
