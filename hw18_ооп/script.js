// Store Class

class Store {
    #reducer;
    #state;
    #cbs = []

    constructor(reducer) {
        this.#reducer = reducer;
        this.#state = this.#reducer(undefined, {});
    }

    getState() {
        return this.#state;
    }

    subscribe(cb) {
        this.#cbs.push(cb),
            () => this.#cbs = this.#cbs.filter(c => c !== cb);
    }

    dispatch(action) {
        const newState = this.#reducer(this.#state, action);
        if (newState !== this.#state) {
            this.#state = newState;
            this.#cbs.forEach(cb => cb());
        }
    }
}

const store = new Store(reducer)


// Password Class

class Password {
    #container;
    #pwInput;
    #isOpenCheckbox;

    constructor(parent, open) {
        this.#container = document.createElement('div');
        parent.append(this.#container);

        this.#pwInput = document.createElement('input');
        this.#isOpenCheckbox = document.createElement('input');
        
        this.#isOpenCheckbox.type = 'checkbox';
        this.#isOpenCheckbox.checked = open;

        this.#pwInput.type = open ? 'text' : 'password';
        this.#pwInput.name = 'password';
        
        this.#container.append(this.#pwInput);
        this.#container.append(this.#isOpenCheckbox);

        this.#pwInput.addEventListener('input', () => {
            if (this.onChange) {
                this.onChange(this.#pwInput.value);
            } 
        });

        this.#isOpenCheckbox.addEventListener('change', () => {
            this.setOpen(this.#isOpenCheckbox.checked);
        });
    }

    getValue() {
        return this.#pwInput.value;
    }

    setValue(value) {
        this.#pwInput.value = value;

        if (this.onChange) {
            this.onChange(value);
        } 
    }

    getOpen() {
        return this.#isOpenCheckbox.checked;
    }

    setOpen(isOpen) {
        this.#pwInput.type = isOpen ? 'text' : 'password';
        this.#isOpenCheckbox.checked = isOpen;

        if (this.onOpenChange) {
            this.onOpenChange(isOpen);
        }
    }

    setStyle(property, value) {
        this.#pwInput.style[property] = value;
    }
}


// StoreThunk Class

class StoreThunk extends Store {
    constructor(reducer) {
        super(reducer);
    }

    dispatch(action) {
        if (typeof action === "function") {
            action(this.dispatch.bind(this), this.getState.bind(this));
        } else {
            super.dispatch(action);
        }
    }
}


// RGB Class

class RGB {
    #r = 0
    #g = 0
    #b = 0

    get r() {
        return this.#r
    }
    set r(color) {
        if (color <= 255 && color >= 0) {
            this.#r = color
        } else {
            throw new RangeError("Error color: red")
        }
    }

    get g() {
        return this.#g
    }
    set g(color) {
        if (color <= 255 && color >= 0) {
            this.#g = color
        } else {
            throw new RangeError("Error color: green")
        }
    }

    get b() {
        return this.#b
    }
    set b(color) {
        if (color <= 255 && color >= 0) {
            this.#b = color
        } else {
            throw new RangeError("Error color: blue")
        }
    }

    get rgb() {
        return `rgb(${this.#r},${this.#g},${this.#b})`
    }
    set rgb(color) {
        const rgbArr = color.match(/^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/)
        if (rgbArr !== null) {
            this.#r = +rgbArr[2]
            this.#g = +rgbArr[4]
            this.#b = +rgbArr[6]
        } else {
            throw new SyntaxError("Error: rgb")
        }
    }

    get hex() {
        return "#" + this.#r.toString(16).padStart(2, "0").toUpperCase() + this.#g.toString(16).padStart(2, "0").toUpperCase() + this.#b.toString(16).padStart(2, "0").toUpperCase()
    }
    set hex(color) {
        const hexArr = color.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/)
        if (hexArr !== null) {
            this.#r = parseInt(hexArr[1], 16)
            this.#g = parseInt(hexArr[2], 16)
            this.#b = parseInt(hexArr[3], 16)
        } else {
            throw new SyntaxError("Error: hex")
        }
    }
}

//перевірка
const rgb = new RGB
rgb.r = 15
rgb.g = 128
rgb.b = 192
console.log(rgb.hex) //#0F80C0
console.log(rgb.rgb) //rgb(15,128,192)
rgb.hex = '#2030FF'
console.log(rgb.rgb) //rgb(32, 48, 255)
rgb.rgb = 'rgb(100, 90, 50)'
console.log(rgb.r, rgb.g, rgb.b) //100, 90, 50

rgb.hex = 'діч' //SyntaxError
rgb.r   = 1000   //RangeError


// RGBA Class

class RGBA extends RGB {
    #a

    get a() {
        return this.#a
    }
    set a(transparency) {
        if (transparency <= 1 && transparency >= 0) {
            this.#a = transparency
        } else {
            throw new RangeError("Error transparency")
        }
    }

    get rgba() {
        if (this.#a !== undefined) {
            return `rgba(${this.r},${this.g},${this.b},${this.#a})`
        } else {
            throw new SyntaxError("Error: rgba")
        }
    }

    set rgba(color) {
        const rgbA = color.match(/rgba?\((\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*)((?:,\s*[0-9.]*\s*)?)\)/)

        try {
            this.rgb = `rgb(${rgbA[1]})`
            this.a = +rgbA[2].slice(1, )
        } catch(error) {
            throw new SyntaxError("Error: rgba")
        }
    }

    get hex() {
        return super.hex + (this.#a ? Math.round(this.#a * 255).toString(16).padStart(2, '0').toUpperCase() : "")
    }

    set hex(color) {
        const hexA = color.slice(7)

        try {
            super.hex = color.slice(0 ,7)
            this.a = (parseInt(hexA, 16) / 255).toFixed(2)
        } catch(error) {
            throw new SyntaxError("Error: hex(a)")
        }
    }

    set color(color) {
        if (color.slice(0,1) === "#") {
            this.hex(color)
        } else {
            if (color.slice(0,3) === "rgb") {
                color.slice(0,4) === "rgba" ? this.rgba = color : super.rgb = color
            } else {
                throw new SyntaxError("Error: color")
            }
        }
    }
}

//перевірка
const rgba = new RGBA
rgba.hex = '#80808080'
console.log(rgba.a) //0.5
console.log(rgba.rgba) //rgba(128,128,128,0.5)
rgba.r = 192
rgba.a = 0.25
console.log(rgba.hex)  //#C0808040

rgba.color = 'rgba(1,2,3,0.70)'
rgba.b    *= 10
console.log(rgba.hex)  //#01021EB3