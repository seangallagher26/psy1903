let jsPsych = initJsPsych();
let timeline = [];

//welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the <span class='bkgrnd'>Math Response Time Task</span></h1> 
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

// survey
let likert = [
    "Strongly Disagree",
    "Disagree",
    "Netural",
    "Agree",
    "Strongly Agree"
];

let survey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", labels: likert },
        { prompt: "I find math easy.", labels: likert }
    ]
}

timeline.push(survey);

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
            preamble: `<h1 class='eq'> What is <span class='num'>${question.num1}</span> + <span class='num'>${question.num2}</span> ?</h1>`,
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
                data.response = data.response.userInput;
                if (data.response == question.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }



            }
        }
        timeline.push(conditionTrial);
    }
}

// save results
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();

        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

//debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1> 
    <p>You can now close this tab.</p>
    `,
    choices: 'NO_KEYS',
};
timeline.push(debriefTrial);

jsPsych.run(timeline);
