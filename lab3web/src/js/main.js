var myModule = (function () {
    function Calc() {
        this.num1 = 0
        this.num2 = 0
        this.c = ''
        this.op = '+'
        this.checked = null
        this.flush = false
        this.operation = [];

        this.buttons = function (kn, elem) {
            this.flush = false
            if (elem) {
                if (this.checked) {
                    this.checked.classList.remove('checked')
                }
                this.checked = elem
                this.checked.classList.add('checked')
            }

            this.num2 = parseFloat(this.c)

            if (kn == '√') {
                if (this.c.length == 0)
                    this.num2 = 0;
                this.calculate()
                if (this.num1 >= 0) {
                    this.sendData([this.num1, '√']);
                    this.num1 = Math.sqrt(this.num1);
                } else{
                    this.redraw('Error')
                }
                this
                this.num2 = 0
                this.c = ''
                this.op = '+'
                this.redraw(this.num1)
                return
            }
            if (kn == 'c') {
                this.num1 = 0
                this.redraw(this.num1)
                this.num2 = 0
                this.c = ''
                this.op = '+'
                return
            }
            if (this.c.length == 0) {
                this.op = kn
                return
            }
            this.c = ''
            
            if (kn == '=') {
                this.sendData([this.num1, this.op, this.num2]);
                this.flush = true
            }
            //this.redraw(this.c)

            this.calculate()
            this.redraw(this.num1)
            this.op = kn
        }

        this.sendData = (array) => {
            const text = array[2] ? `${array[0]}${array[1]}${array[2]},` : `${array[0]}${array[1]},`
            const obj = {
                data: text,
            };

            fetch('send', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj),
                })
                .catch(error => console.log(error));

            console.log(obj);
        }


        this.calculate = function () {
            switch (this.op) {
                case '+':
                    this.num1 += this.num2
                    break

                case '-':
                    this.num1 -= this.num2
                    break

                case '*':
                    this.num1 *= this.num2
                    break
                case '/':
                    this.num1 /= this.num2
                    break

                case '^':
                    this.num1 **= this.num2
                    break

                case '%':
                    this.num1 %= this.num2
                    break
            }

        }

        this.num = function (c) {
            if (this.flush) {
                this.num1 = 0
                this.op = '+'
            }
            if (c == '.') {
                if (this.c.indexOf('.') > -1) {
                    return
                }
                if (this.c.length == 0)
                    this.c = '0'
            }
            if (this.c.length > 10)
                return
            this.c += c
            this.redraw(this.c)
        }

        this.redraw = function (n) {
            document.getElementById('pole').innerHTML = n
        }
    }

    var calc = new Calc();
    
    return {
        knop: function(a, b) {
            calc.buttons(a, b)
        },
        numb: function(k) {
            calc.num(k)
        }
    }
}())

