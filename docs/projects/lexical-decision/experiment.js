/* let jsPsych = initJsPsych();

let timeline = [];

// welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task</h1>
    <p>You are about to see a series of characters.</p>
    <p>Press F if the characters make up a word.</p>
    <p>Press J if the characters do not make up a word.</p>
    <p>Press SPACE to begin</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);
*/

//show word on repeat
//Create an array of conditions
let conditions = [
    {
        title: 'Part 1',
        count: 3,
        conditions: [
            { characters: 'cat', isWord: true },
            { characters: 'pin', isWord: true },
            { characters: 'jgb', isWord: false },
            { characters: 'mub', isWord: false },
        ],
    },
    {
        title: 'Part 2',
        count: 4,
        conditions: [
            { characters: 'food', isWord: true },
            { characters: 'burn', isWord: true },
            { characters: 'mnut', isWord: false },
            { characters: 'plut', isWord: false },
        ]
    },
    {
        title: 'Part 3',
        count: 5,
        conditions: [
            { characters: 'apple', isWord: true },
            { characters: 'jumps', isWord: true },
            { characters: 'pilde', isWord: false },
            { characters: 'kandy', isWord: false },
        ]
    }
];

let jsPsych = initJsPsych();

let timeline = [];

// let conditions = [...redacted for brevity - see above...]

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p>Press SPACE to begin the first part.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    // Randomize the conditions in this block
    blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${condition.characters}</h1>`,
            data: {
                collect: true,
                characters: condition.characters,
                blockId: block.title, // ⭐ Add a block id to our results data
            },
            choices: ['f', 'j'],
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: 'NO_KEYS',
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);

// Shuffle the conditions
/* conditions = jsPsych.randomization.repeat(conditions, 1);

for (let block of conditions) {

    let blockConditions = block.conditions;

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial)

    blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${condition.characters}</h1>`,
            data: {
                collect: true,
                characters: condition.characters,
                blockId: block.title, // ⭐ Add a block id to our results data
            },
            choices: ['f', 'j'],
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,
        choices: ['f', 'j'],
        data: {
            collect: true,
            characters: condition.characters
        },
        on_finish: function (data) {
            if (data.response == 'f' && condition.isWord == true) {
                data.correct = true;
            } else if (data.response == 'j' && condition.isWord == false) {
                data.correct = true;
            } else {
                data.correct = false;
            }
        }
    }
    timeline.push(conditionTrial);
}
}

//debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank You!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function xcz() {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();

    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline)

//EACH OF THESE ARE A TRIAL IN JSPSYCH
*/