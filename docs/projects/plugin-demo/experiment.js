let jsPsych = initJsPsych();
let timeline = [];

let images = [
    'img/interaction_1.jpg',
    'img/interaction_2.jpg',
    'img/interaction_3.jpg',
    'img/interaction_4.jpg'
];

let participantId = getCurrentTimestamp();

let preload = {
    type: jsPsychPreload,
    images: images
}

timeline.push(preload);

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the jsPsych Plugin Demo!</h1> 
    <p>In this study you will complete a demo of the categorize-animation jsPsych feature</p>
    <p>This is just a demo, and aims to test a modified version of Heider & Simmel, 1944.</p>
    <p>Press the <span class='key'>SPACE</span> key to begin.</p>
    `,
    choices: [' '],
    data: {
        collect: true
    },
};

timeline.push(welcomeTrial);

var animation_trial = {
    type: jsPsychCategorizeAnimation,
    stimuli: images,
    prompt: `
    <p>If you think the triangle likes the circle, press the <span class='key'>P</span> key.</p>
    <p>If you think the triangle feels neutrally about the circle, press the <span class='key'>T</span> key.</p>
    <p>If you think the triangle dislikes the circle, press the <span class='key'>Q</span> key.</p>
    `,
    choices: ['p', 't', 'q'],
    key_answer: 't',
    data: {
        collect: true
    },
};

timeline.push(animation_trial);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loading'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId = '', forceOSFSave = false).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for your participation!</h1> 
    <a href='https://harvard.az1.qualtrics.com/jfe/form/SV_eRsXfG5xFS33IQm?experimentParticipantId=${participantId}'>Please follow this link and complete the survey...</a>
    `,
    choices: 'NO_KEYS',
};
timeline.push(debriefTrial);
console.log(resultsTrial);

jsPsych.run(timeline);