let jsPsych = initJsPsych();
let timeline = [];

//welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task</h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

//set up blocks
for (let block of conditions) {
    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press space to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);
    for (let question of block.questions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<h1> What is ${question.num1} + ${question.num2} ?</h1>`,
            html: `<p><input type='text' name='userInput' id='response'></p>`,
            autofocus: 'response',
            data: {
                collect: true,
                num1: question.num1,
                num2: question.num2,
                correctAnswer: question.answer,
                blockId: block.title,
            },
            on_finish: function (data) {
                if (data.response.userInput == question.answer) {
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
    <h1>Thank you!</h1> 
    <p>You can now close this tab.</p>
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
