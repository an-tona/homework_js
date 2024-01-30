const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
}

const htmlTree = {
    tagName: 'body',
    children: [
    {
        tagName: 'div',
        children: [
            {
                tagName: 'span',
                children: ['Enter a data please:']
            }, 
            {
                tagName: 'br'
            }, 
            {
                tagName: 'input',
                attrs: {
                    type: 'text',
                    id: 'name'
                }
            }, 
            {
                tagName: 'input',
                attrs: {
                    type: 'text',
                    id: 'surname'
                }
            }
        ]
    },
    {
        tagName: 'div',
        children: [
            {
                tagName: 'button', 
                attrs: {
                    id: 'ok'
                },
                children: ['OK'] 
            },
            {
                tagName: 'button',
                attrs: {
                    id: 'cancel'
                },
                children: ['Cancel']
            }
        ]
    }
    ]
}


//Рекурсія: HTML tree

function createHTMLTree(tree) {
    let html = '';

    html += `<${tree.tagName} `;
    for (const attr in tree.attrs) {
        html += `${attr} ="${tree.attrs[attr]}"`;
    }
    html += `>`;

    if (tree.children) {
        if(typeof tree.children[0] === 'string') {
            html += `${tree.children[0]}`;
        } else {
        for (const child of tree.children) {
          html += `${createHTMLTree(child)}`;
            }
        }
    }
    html += `</${tree.tagName}>`;

    return html;
}

document.write(createHTMLTree(table));
document.write(createHTMLTree(htmlTree));


//Рекурсія: DOM tree

function createDOMTree(tree, parent) {
    const tag = document.createElement(tree.tagName);

    for (const attr in tree.attrs) {
        tag.setAttribute(attr, tree.attrs[attr]);
    }

    if (tree.children) {
        tree.children.forEach(child => {
            if (typeof child === 'string') {
                tag.textContent = child;
            } else {
                createDOMTree(child, tag);
            }
        });
    }
    parent.appendChild(tag);

    return tag;
}

createDOMTree(table, document.body);
createDOMTree(htmlTree, document.body);


//Рекурсія: Deep Copy

function deepCopy(origObj) {
    let newObj;

    if (typeof origObj !== 'object' || origObj === null) {
        return origObj;
    }

    newObj = Array.isArray(origObj) ? [] : {};

    for (let key in origObj) {
        newObj[key] = deepCopy(origObj[key]);
    }
    
    return newObj;
}

const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false];
const arr2 = deepCopy(arr);
const table2 = deepCopy(table);

console.log(arr2);
console.log(table2);


//Рекурсiя: My Stringify

function stringify(obj) {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    } else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
        return `${obj}`;
    } else if (Array.isArray(obj)) {
        const elements = obj.map(element => stringify(element)).join(',');
        return `[${elements}]`;
    } else if (typeof obj === 'object') {
        const properties = Object.keys(obj).map(key => `"${key}":${stringify(obj[key])}`).join(',');
        return `{${properties}}`;
    } else {
        return undefined;
    }
}

const jsonString = stringify(table);
console.log(jsonString);


//Рекурсія: getElementById throw

function getElementById(idToFind) {
    function walker(parent) {
        for (const child of parent.children) {
            if (child.id === idToFind) {
                throw child;
            }
            walker(child);
        }
    }

    try {
        walker(document.body);
    } catch (foundId) {
        return foundId;
    }

    return null;
}