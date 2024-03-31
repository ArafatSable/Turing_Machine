const N = 1000; // tape length, initialize to a large value

class TuringMachine {
    constructor(program, input, state = 0) {
        this.trf = {};
        this.state = state.toString();
        this.tape = '_'.repeat(N);
        this.head = Math.floor(N / 2); // head is positioned in the middle
        this.tape = this.tape.slice(0, this.head) + input + this.tape.slice(this.head);
        program.split('\n').forEach(line => {
            const [s, a, r, d, s1] = line.split(' ');
            this.trf[`${s},${a}`] = [r, d, s1];
        });
        this.executionSteps = [];
    }

    step() {
        if (this.state !== 'H') {
            const a = this.tape[this.head];
            const action = this.trf[`${this.state},${a}`];
            if (action) {
                const [r, d, s1] = action;
                this.tape = this.tape.slice(0, this.head) + r + this.tape.slice(this.head + 1);
                if (d !== '*') {
                    this.head += (d === 'r' ? 1 : -1);
                }
                this.state = s1;
                this.executionSteps.push({ tape: this.tape.replace(/_/g, ''), state: this.state });
            }
        }
    }

    async run(max_iter = 9999) {
        let iter = 0;
        while (this.state !== 'H' && iter < max_iter) {
            this.step();
            iter++;
        }
        this.executionSteps.push({ tape: this.tape.replace(/_/g, ''), state: this.state });
        this.displayExecution();
    }

    displayExecution() {
        const executionStepsContainer = document.getElementById('execution-steps');
        executionStepsContainer.innerHTML = '';
        // Get the final tape configuration
        const finalStep = this.executionSteps[this.executionSteps.length - 1];

        // Create a single box element to display the final tape configuration
        const finalTapeElement = document.createElement('div');
        finalTapeElement.classList.add('tape');
        finalTapeElement.textContent = finalStep.tape;

        executionStepsContainer.appendChild(finalTapeElement);
        this.executionSteps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.classList.add('step');

            const tapeElement = document.createElement('div');
            tapeElement.classList.add('tape');
            tapeElement.textContent = step.tape;
            stepElement.appendChild(tapeElement);

            const stateElement = document.createElement('div');
            stateElement.classList.add('state');
            stateElement.textContent = `State: ${step.state}`;
            stepElement.appendChild(stateElement);

            executionStepsContainer.appendChild(stepElement);

        });
    }
}





// import the file program2.txt




function runBinaryAddition() {
    // take input from html user id="binary-input1"
    let binaryInput1 = document.getElementById("binary-input1").value.trim();
    let binaryInput2 = document.getElementById("binary-input2").value.trim();

    console.log(`Binary Inputs are "${binaryInput1}" and "${binaryInput2}"`);
    const input = binaryInput1 + '_' + binaryInput2;

    // Example usage:
    const program = `
0 0 0 r 0
0 1 1 r 0
0 _ _ r 1
1 0 0 r 1
1 1 1 r 1
1 _ _ l 2
2 0 1 l 2
2 1 0 l 3
2 _ _ r 5
3 0 0 l 3
3 1 1 l 3
3 _ _ l 4
4 0 1 r 0
4 1 0 l 4
4 _ 1 r 0
5 1 _ r 5
5 _ _ * H
`;

    const tm = new TuringMachine(program, input);
    tm.run();
}

function runBinaryToUnaryConversion() {
    // Get binary input from HTML user input with id="binary-input1"
    const binaryInput = document.getElementById("binary-input1").value.trim();

    console.log(`Binary Input is "${binaryInput}"`);

    // Example program for binary to unary conversion
    const program = `
0 0 0 r 0
0 1 1 r 0
0 _ _ l 1
1 1 0 r 2
1 0 1 l 1
1 _ _ r 5
2 0 0 r 2
2 1 1 r 2
2 _ _ r 3
3 _ 1 l 4
3 1 1 r 3
4 1 1 l 4
4 _ _ l 1
5 1 _ r 5
5 _ _ r H
`;

    // Concatenate the binary input with underscores
    const input = binaryInput;

    // Create a new instance of TuringMachine with the provided program and input
    const tm = new TuringMachine(program, input);

    // Run the Turing machine
    tm.run();
}

function runUnaryToBinaryConversion() {
    // Define the program for unary to binary conversion
    const program = `
0 1 1 r 0
0 _ _ l 1
1 1 _ l 2
1 _ _ * H
2 1 1 l 2
2 _ _ l 3
3 _ 1 r 4
3 0 1 r 4
3 1 0 l 3
4 0 0 r 4
4 1 1 r 4
4 _ _ r 0
`;

    // Get unary input from HTML user input with id="binary-input1"
    const unaryInput = document.getElementById("binary-input1").value.trim();

    console.log(`Unary Input is "${unaryInput}"`);

    // Concatenate an underscore to the unary input
    const input = unaryInput;

    // Create a new instance of TuringMachine with the provided program and input
    const tm = new TuringMachine(program, input);

    // Run the Turing machine
    tm.run();
}

function runIncrementBinaryBy1() {
    // Define the program for incrementing binary number by 1
    const program = `
0 0 0 r 0
0 1 1 r 0
0 _ _ r 1
1 0 0 r 1
1 1 1 r 1
1 _ _ l 2
2 0 1 l 2
2 1 0 l 3
2 _ _ r 5
3 0 0 l 3
3 1 1 l 3
3 _ _ l 4
4 0 1 r 0
4 1 0 l 4
4 _ 1 r 0
5 1 _ r 5
5 _ _ * H
`;
    // Get binary input from HTML user inputs with IDs "binary-input1" and "binary-input2"
    const binaryInput1 = document.getElementById("binary-input1").value.trim();
    

    console.log(`Binary Inputs are "${binaryInput1}"`);

    // Concatenate the binary inputs with underscore
    const input = binaryInput1 + '_1';

    // Create a new instance of TuringMachine with the provided program and input
    const tm = new TuringMachine(program, input);

    // Run the Turing machine
    tm.run();
}


function runDoublingUnaryNumber() {
    // Define the program for doubling unary number
    const program = `
0 1 _ r 1
1 1 1 r 1
1 _ _ r 2
2 1 1 r 2
2 _ 1 r 3
3 _ 1 l 4
4 1 1 l 4
4 _ _ l 5
5 1 1 l 5
5 _ _ r 6
6 1 _ r 1
6 _ _ r H
`;

    // Get unary input from HTML user input with id="binary-input1"
    const unaryInput = document.getElementById("binary-input1").value.trim();

    console.log(`Unary Input is "${unaryInput}"`);

    // Concatenate an underscore to the unary input
    const input = unaryInput;

    // Create a new instance of TuringMachine with the provided program and input
    const tm = new TuringMachine(program, input);

    // Run the Turing machine
    tm.run();
}

function runPalindromeDetection() {
    // Define the program for palindrome detection
    const program = `
0 _ _ l 1
0 0 0 r 0
0 1 1 r 0
1 _ 1 * H
1 0 _ l 2
1 1 _ l 4
2 _ _ r 3
2 0 0 l 2
2 1 1 l 2
3 _ _ * 0
3 0 _ r 0
3 1 1 * 6
4 _ _ r 5
4 0 0 l 4
4 1 1 l 4
5 _ _ * 0
5 0 0 * 6
5 1 _ r 0
6 _ 0 * H
6 0 _ r 6
6 1 _ r 6
`;

    // Get binary input from HTML user input with id="binary-input1"
    const binaryInput1 = document.getElementById("binary-input1").value.trim();

    console.log(`Binary Input is "${binaryInput1}"`);

    // Concatenate an underscore to the binary input
    const input = binaryInput1;

    // Create a new instance of TuringMachine with the provided program and input
    const tm = new TuringMachine(program, input);

    // Run the Turing machine
    tm.run();
}
