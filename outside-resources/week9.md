# Outside Resources Log - Week 7


## AI Prompts
+ .loading {
    width: 48px;
    height: 48px;
    border: 5px solid #000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
} how do I make this spin?

+ what is a real world  experiment that could use the categorize-animation jspsych plugin

+ social psychology (as a response to what area I am interested in)

+ why is this code not displaying the images when I run it in my local server? 
```js
let jsPsych = initJsPsych();
let timeline = [];


let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 
    <h1>Welcome to the jsPsych Plugin Demo!</h1> 
    <p>In this study you will complete a demo of the categorize-animation jsPsych feature</p>
    <p>This is just a demo, and aims to test a modified version of Heider & Simmel, 1944.</p>
    <p>Press the <span class='key'>SPACE</span> key to begin.</p>
    ,
    choices: [' '],
};

timeline.push(welcomeTrial);

var animation_trial = {
    type: jsPsychCategorizeAnimation,
    stimuli: [
        'img/interaction_1.jpg',
        'img/interaction_2.jpg',
        'img/interaction_3.jpg',
        'img/interaction_4.jpg'
    ],
    prompt: 
    <img src='img/interaction_1.jpg'>
    <p>If you think the triangle likes the circle, press the <span class='key'>P</span> key.</p>
    <p>If you think the triangle feels neutrally about the circle, press the <span class='key'>T</span> key.</p>
    <p>If you think the triangle dislikes the circle, press the <span class='key'>Q</span> key.</p>
    ,
    choices: ['p', 't', 'q'],
    key_answer: 't',
};

timeline.push(animation_trial);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: 
        <h1>Please wait...</h1>
        <span class='loading'></span>
        <p>We are saving the results of your inputs.</p>
        ,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = '';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId = '', forceOSFSave = false).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

jsPsych.run(timeline);
```

## Outside sites
+ https://www-jstor-org.ezp-prod1.hul.harvard.edu/stable/1416950?origin=crossref&seq=1

+ https://blog.surveyplanet.com/how-to-use-demographic-survey-questions-examples-and-phrasing-guidelines