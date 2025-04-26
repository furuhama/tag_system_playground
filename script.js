function deleteRule(button) {
    button.parentElement.remove();
}

function addRule() {
    const container = document.getElementById('rules-container');
    const ruleDiv = document.createElement('div');
    ruleDiv.className = 'rule-input';

    const inputChar = document.createElement('input');
    inputChar.type = 'text';
    inputChar.className = 'rule-input-char';
    inputChar.placeholder = 'Input character';

    const outputString = document.createElement('input');
    outputString.type = 'text';
    outputString.className = 'rule-output-string';
    outputString.placeholder = 'Output string';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-rule';
    deleteButton.onclick = function() { deleteRule(this); };
    deleteButton.textContent = '✕';

    ruleDiv.appendChild(inputChar);
    ruleDiv.appendChild(outputString);
    ruleDiv.appendChild(deleteButton);
    container.appendChild(ruleDiv);
}

function collectRules() {
    const rules = new Map();
    const ruleInputs = document.querySelectorAll('.rule-input');
    ruleInputs.forEach(rule => {
        const inputChar = rule.querySelector('.rule-input-char').value;
        const outputString = rule.querySelector('.rule-output-string').value;
        if (inputChar && outputString) {
            rules.set(inputChar, outputString);
        }
    });
    return rules;
}

function applyTagSystemRule(currentString, mValue, rules) {
    const firstChar = currentString[0];

    if (!rules.has(firstChar)) {
        return { success: false, error: `No rule for character '${firstChar}'` };
    }

    if (currentString.length < mValue) {
        return { success: false, error: 'String too short' };
    }

    const newString = currentString.slice(mValue) + rules.get(firstChar);
    return { success: true, result: newString };
}

function displayStep(output, content, step) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step';
    stepDiv.textContent = `Step ${step}: ${content}`;
    output.appendChild(stepDiv);
}

function runTagSystem(currentString, mValue, rules, maxSteps) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    const seenStates = new Map();
    displayStep(output, currentString, 0);
    seenStates.set(currentString, 0);

    let step = 1;
    while (currentString.length > 0 && step <= maxSteps) {
        const result = applyTagSystemRule(currentString, mValue, rules);

        if (!result.success) {
            displayStep(output, `Halted: ${result.error}`, step);
            break;
        }

        currentString = result.result;

        if (seenStates.has(currentString)) {
            const previousStep = seenStates.get(currentString);
            const loopLength = step - previousStep;
            displayStep(output, `Loop detected! States from step ${previousStep} repeat every ${loopLength} steps`, step);
            break;
        }

        displayStep(output, currentString, step);
        seenStates.set(currentString, step);
        step++;
    }

    if (step > maxSteps) {
        displayStep(output, 'Halted: Maximum steps reached', step);
    }
}

function simulate() {
    const mValue = parseInt(document.getElementById('m-value').value);
    const initialString = document.getElementById('initial-string').value;
    const maxSteps = parseInt(document.getElementById('max-steps').value);
    const rules = collectRules();

    runTagSystem(initialString, mValue, rules, maxSteps);
}

addRule();
