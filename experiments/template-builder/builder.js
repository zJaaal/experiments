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

    this._closing = this._selfClosingFlag ? "/>" : `</${tag}>`;

    return this;
  }

  addProp(prop, value) {
    this._props.push(`${prop}="${value}"`);
    return this;
  }

  addContent(content) {
    this._selfClosingFlag
      ? console.warn("Cannot add content to a self closing tag")
      : (this._content += content);

    return this;
  }

  create() {
    return this._selfClosingFlag
      ? `${this._tag} ${this._props.join(" ")} ${this._closing}`
      : `${this._tag} ${this._props.join(" ")}>${this._content}${this._closing}`;
  }
}
