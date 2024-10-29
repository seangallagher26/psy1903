let jsPsych = initJsPsych();
let timeline = [];


//welcome
let enterFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
};

timeline.push(enterFullScreenTrial);

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Implicit Associations Test!</h1> 
    <p>In this study you will complete the following three tasks:</p>
    <div class='story'>
    <ul class='custom-bullets'>
        <li>In Task 1 you will be asked to look at a picture and write a short response.</li>
        <li>In Task 2 you will be asked to categorize a series of images.</li>
        <li>In Task 3 you will answer a brief set of questions</li>
    </div>
    <p>Press the <span class='key'>SPACE</span> key to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

//Primer
let primer = ['stereotypical', 'atypical'];
let primerDisplay = primer[Math.floor(Math.random() * primer.length)];

let primerTrial = {
    type: jsPsychSurveyText,
    preamble: `
    <h1>Task 1 of 3</h1>
    <p>Consider the following image:</p>
    <div class='story'>
    <img src='images/${primerDisplay}.png'>
    </div>
    `,
    html: `<p><input type='text' name ='answer' id='answer'></p>`,
    autofocus: 'answer',
    button_label: 'Continue',
    questions: [
        { prompt: "Please write 2 observations in the textbox below." }
    ],
    data: {
        collect: true
    },
    on_finish: function (data) {
        data.whichPrime = primerDisplay;
        data.trialType = "prime"
    },
}

timeline.push(primerTrial);

//IAT
let iatInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 2 of 3</h1>
    <p>In this next task, you will be shown a series of words and asked to sort them into categories.</p>
    <p>Press <span class='key'>SPACE</span> to begin.
    `,
    choices: [' '],
}
timeline.push(iatInstructions);

let iteration = 0;


for (let condition of conditions) {
    let leftCategory = condition.categories[0];
    let rightCategory = condition.categories[1];
    iteration++;
    let blockInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1><span class = 'title'>Part ${iteration} of 4</span></h1>
            <p>In this part, the two categories will be <span class='bold'>${leftCategory}</span> and <span class='bold'>${rightCategory}</span></p>
            <p>If the word you see in the middle of the screen should be sorted into the <span class='bold'>${leftCategory}</span> category, press the <span class='key'>F</span> key.</p>
            <p>If the word you see in the middle of the screen should be sorted into the <span class='bold'>${rightCategory}</span> category, press the <span class='key'>J</span> key.</p>
            <p>Press the <span class='key'>SPACE</span> key to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockInstructions);


    for (let trial of condition.trials) {

        let wordDisplay = {
            type: jsPsychHtmlKeyboardResponse,

            stimulus: `
         <p><span class='category1'>Press <span class='key'>f</span> for ${leftCategory}</span><p>
         <p><span class='category2'>Press <span class='key'>j</span> for ${rightCategory}</span><p>
         <h1><span class = 'target'>${trial.word}</span></h1>
        `,

            data: {
                collect: true,
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                trialType: "iat",
                leftCategory: leftCategory,
                rightCategory: rightCategory,
            },
            choices: ['f', 'j'],
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            },
        }
        let fixationScreen = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '<div style="font-size: 80px; text-align: center;">+</div>',
            choices: 'NO_KEYS',
            trial_duration: 250,
        }
        timeline.push(wordDisplay, fixationScreen);
    }
}


//Likert
let likert = [
    "Strongly Disagree",
    "Disagree",
    "Slightly Disagree",
    "Netural",
    "Slightly Agree",
    "Agree",
    "Strongly Agree"
];

let survey = {
    type: jsPsychSurveyLikert,
    preamble: `
    <h1>Task 3 of 3</h1>
    <p>Please answer the following questions...</p>
    `,
    questions: [
        { prompt: "Government is almost always wasteful and inefficient.", labels: likert },
        { prompt: "Immigrants today strengthen our country because of their hard work and talents.", labels: likert },
        { prompt: "The government today can’t afford to do much more to help the needy.", labels: likert },
        { prompt: "Good diplomacy is the best way to ensure peace.", labels: likert },
        { prompt: "Black people who can’t get ahead in this country are mostly responsible for their own condition.", labels: likert },
        { prompt: "Business corporations make too much profit.", labels: likert },
        { prompt: "Government regulation of business usually does more harm than good.", labels: likert },
        { prompt: "Stricter environmental laws and regulations are worth the cost.", labels: likert },
        { prompt: "Poor people today have it easy because they can get government benefits without doing anything good in return.", labels: likert },
        { prompt: "Homosexuality should be accepted by society.", labels: likert },

    ],
    data: {
        collect: true,
        trialType: "questionnaire"
    },
}

timeline.push(survey);

//Results Save
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>

        
        <div class='loading'></div>
        `,
    on_start: function () {
        let prefix = 'gender-major-iat';

        let dataPipeExperimentId = '4TryNtw5s4zT';
        let forceOSFSave = true;

        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['plugin_version', 'collect', 'trial_type', 'stimulus'])
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



let exitFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
};
timeline.push(exitFullScreenTrial);

//Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for your participation!</h1> 
    <p>You can now close this tab.</p>
    `,
    choices: 'NO_KEYS',
};
timeline.push(debriefTrial);

jsPsych.run(timeline);