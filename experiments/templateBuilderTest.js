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
        .create()
    )
    .create()
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
    .create()
);

/* <img src="myImage.png" class="some classes lmao center" /> */
