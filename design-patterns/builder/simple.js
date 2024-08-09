const TAG_INDENT = 2;
class Tag {
    constructor(name = '', text = '') {
        this.name = name;
        this.text = text;
        this.children = [];
    }

    toStringImpl(indent) {
        let html = [];
        const INDENTATION = ' '.repeat(indent * TAG_INDENT);

        html.push(`${INDENTATION}<${this.name}>\n`);
        if (this.text.length > 0) {
            html.push(' '.repeat(TAG_INDENT * (indent + 1)));
            html.push(this.text);
            html.push('\n');
        }

        for (let child of this.children) html.push(child.toStringImpl(indent + 1));

        html.push(`${INDENTATION}</${this.name}>\n`);
        return html.join('');
    }

    toString() {
        return this.toStringImpl(0);
    }

    static create(name) {
        return new HtmlBuilder(name);
    }
}

class HtmlBuilder {
    constructor(rootName) {
        this.root = new Tag(rootName);
        this.rootName = rootName;
    }

    // Non-fluent interface
    addChild(childName, childText) {
        const child = new Tag(childName, childText);
        this.root.children.push(child);
    }

    addChildFluent(childName, childText) {
        const child = new Tag(childName, childText);
        this.root.children.push(child);
        return this;
    }

    toString() {
        return this.root.toString();
    }

    build() {
        return this.root;
    }

    clear() {
        this.root = new Tag(this.rootName);
    }
}

// We can rewrite the code below using the builder pattern
const hello = 'hello';
let html = [];

// This is construction logic
html.push('<p>');
html.push('hello');
html.push('</p>');
console.log(html.join(''));

const words = ['hello', 'world']; // See how is getting complicated
html = [];
html.push('<ul>\n');

for (let word of words) html.push(`  <li>${word}</li>\n`); // Same construction logic

html.push('</ul>');

console.log(html.join(''));

// New Approach using the builder pattern

let builder = new HtmlBuilder('ul');
for (let word of words) builder.addChild('li', word);

console.log(builder.toString());

// We can initialize from Tag

builder = Tag.create('ul');
for (let word of words) builder.addChild('li', word);

console.log(builder.toString());

builder.clear();

// Fluent interface

builder.addChildFluent('li', 'foo').addChildFluent('li', 'bar').addChildFluent('li', 'baz');

console.log(builder.toString());
