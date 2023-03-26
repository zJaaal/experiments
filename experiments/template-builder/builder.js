import { selfClosing } from "./selfClosing.js";

export class TemplateBuilder {
  _tag = "";
  _closing = "";
  _content = "";
  _props = [];

  _selfClosingFlag = false;

  /**
   * @description Initialize the builder with a tag
   * @param {string} tag string representing the tag
   * @returns {TemplateBuilder} builder
   */
  tag(tag) {
    this._tag = `<${tag}`;
    this._selfClosingFlag = selfClosing[tag];

    this._closing = this._selfClosingFlag ? "/>" : `</${tag}>`;

    return this;
  }

  /**
   * @description Adds a property to the tag
   * @param {string} prop Key of the property
   * @param {string} value Value of the property
   * @returns {TemplateBuilder} builder
   */
  prop(prop, value) {
    if (!this._tag.length) throw new Error("Please initialize the builder using tag method");

    this._props.push(`${prop}="${value}"`);
    return this;
  }

  /**
   * @description Adds inner content to the tag if is not a self closing tag
   * @param {string} content String representing the content
   * @param {number} quantity Number of times it repeats
   * @returns {TemplateBuilder} builder
   */
  content(content, quantity = 1) {
    if (!this._tag.length) throw new Error("Please initialize the builder using tag method");

    this._selfClosingFlag
      ? console.warn("Cannot add content to a self closing tag")
      : (this._content += content.repeat(quantity));

    return this;
  }

  /**
   * @description Builds the template using the tag, props and content provided
   * @returns {string} template
   */
  build() {
    if (!this._tag.length) throw new Error("Please initialize the builder using tag method");

    return this._selfClosingFlag
      ? `${this._tag} ${this._props.join(" ")} ${this._closing}`
      : `${this._tag} ${this._props.join(" ")}>${this._content}${this._closing}`;
  }
}
