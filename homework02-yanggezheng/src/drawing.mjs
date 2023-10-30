import fs from 'fs';
// drawing.js
class GenericElement {
    constructor(name){
        this.tagName = name;
        this.attributes = {};
        this.content = "";
    }

    addAttr(name, value){
        this.attributes[name] = value;
    }

    setAttr(name, value){
        this.attributes[name] = value;
    }

    addAttrs(obj){
        const keyArr = Object.keys(obj);
        keyArr.forEach(key => this.attributes[key] = obj[key]);
    }

    removeAttrs(arr){
        for (const ele in arr){
            delete this.attributes[ele];
        }
    }
    toString() {
        // turn attributes into a string:
        // name=value
        const attrsString = Object.entries(this.attributes).reduce((s, attr) => {
            const [name, value] = attr;
            return `${s} ${name}="${value}"`;
        }, '');
        return `<${this.tagName}${attrsString}>${this.content}</${this.tagName}>`;
    }

}

class RootElement extends GenericElement{
    constructor(){
        super("svg");
        this.attributes = {};
        this.attributes.xmlns = "http://www.w3.org/2000/svg";
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }
    toString() {
        let Stringbuilder = "";
        for (let i = 0; i < this.children.length; i++){
            Stringbuilder += this.children[i].toString();
        }
        return `<svg xmlns = "${this.attributes.xmlns}">` + Stringbuilder +"</svg>";
    }
    write(fileName, cb){
        fs.writeFile(fileName,this.toString() , cb);
    }
}

class RectangleElement extends GenericElement {
   constructor(x, y, width, height, fill){
        super("rect");
        this.attributes.x = x;
        this.attributes.y = y;
        this.attributes.width = width;
        this.attributes.height = height;
        this.attributes.fill = fill;
   }
}

class TextElement extends GenericElement{
    constructor(x, y, fontSize, fill, content){
        super("text");
        this.attributes.x = x;
        this.attributes.y = y;
        this.attributes["font-size"] = fontSize;
        this.attributes.fill = fill;
        this.content = content;
    }
}

export{
    GenericElement,
    RootElement,
    RectangleElement,
    TextElement
};