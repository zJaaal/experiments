import { selfClosing } from "./selfClosing.js";

export class TemplateBuilder {
  _tag = "";
  _closing = "";
  _content = "";
  _props = [];

  _selfClosingFlag = false;

  createTag(tag) {
    this._tag = `<${tag}`;
    this._selfClosingFlag = selfClosing[tag];

    if (this._selfClosingFlag) {
      this._closing = "/>";
    } else this._closing = `</${tag}>`;

    return this;
  }

  addProp(prop, value) {
    this._props.push(`${prop}="${value}"`);
    return this;
  }

  addContent(content) {
    if (this._selfClosingFlag)
      return console.warn("Cannot add content to a self closing tag"), this;
    this._content += content;

    return this;
  }

  create(ident) {
    if (this._selfClosingFlag) return `${this._tag} ${this._props.join(" ")} ${this._closing}`;

    return `${this._tag} ${this._props.join(" ")}>${this._content}${this._closing}`;
  }
}
