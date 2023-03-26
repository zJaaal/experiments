import { templateBuilder } from "./template-builder/index.js";

console.log(
  templateBuilder()
    .createTag("a")
    .addProp("href", "https://google.com")
    .addContent(
      templateBuilder()
        .createTag("p")
        .addProp("class", "text-lg text-grey text-align-right")
        .addContent("Google is boring")
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
    .createTag("img")
    .addProp("src", "myImage.png")
    .addProp("class", "repeat center")
    .addContent("cannot add content so some warning should show")
    .build()
);

/* <img src="myImage.png" class="some classes lmao center" /> */

console.log(
  templateBuilder()
    .createTag("aside")
    .addProp("class", "d-flex flex-col")
    .addContent(
      templateBuilder()
        .createTag("p")
        .addProp("class", "flex-grow mb-2")
        .addContent("This is the content")
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
