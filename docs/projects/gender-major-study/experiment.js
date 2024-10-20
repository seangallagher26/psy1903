let jsPsych = initJsPsych();
let timeline = [];

//welcome

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Implicit Associations Test!</h1> 
    <p>In this study you will complete an Implicit Association Test (IAT)</p>
    <p>in which you will be asked to sort words into groups as fast as you can.</p>
    <p>In addition to the IAT, there are some questions about your beliefs, attitudes, and opinions.</p>
    <p>This study should take about 10 minutes to complete.</p>
    <We thank you for being here!</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

//Primer
let primer = ['sterotypical', 'atypical'];
let primerDisplay = primer[Math.floor(Math.random() * primer.length)];

let primerTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <h1>Consider the follwoing image</h1>
    <img src='images/${primerDisplay}.png'>
    <p>Please write 2 observations in the textbox below.</p>
    `,
    html: `<p><input type='text' name ='answer' id='answer'></p>`,
    autofocus: 'answer',
    button_label: 'Continue',
    on_finish: function (data) {
        data.whichPrime = primerDisplay;
    },
}

timeline.push(primerTrial);

//IAT
let iatInstructions = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <h1>Part 2</h1>
    <p>You will now complete the IAT.</p>
    <p>You will use the 'F' and 'J' computer keys to categorize items into groups as fast as you can.</p>
    <p>These are the four groups and the items that belong to each:</p>
    <p> </p>
    <p>Male: Man, Son, Father, Boy, Uncle, Grandpa, Husband, Male, Gentleman, Brother</p>
    <p>Female: Mother, Wife, Aunt, Woman, Girl, Female, Grandma, Daughter, Sister, Lady</p>
    <p>Science: Astronomy, Math, Chemistry, Physics, Biology, Geology, Engineering, Robotics, Ecology, Statistics</p>
    <p>Liberal Arts: History, Arts, Humanities, English, Philosophy, Music, Literature, Anthropology, Dance, Sociology</p>
    `
}
timeline.push(iatInstructions);

let iteration = 0
for (let condition of conditions) {
    iteration++;
    let blockInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1><span class = 'title'>Part ${iteration} of 4</span></h1>
            <p>You will see words related to the following categories: ${condition.categories[0]} and ${condition.categories[1]}</p>
            <p>Press space to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockInstructions);
    console.log(condition.trials);
    for (i = 0; i < 36; i++) {
        let wordDisplay = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
         <p><span class='category1'>Press <span class='key'>f</span> for ${condition.categories[0]}</span><p>
         <p><span class='category2'>Press <span class='key'>j</span> for ${condition.categories[1]}</span><p>
         <h1><span class = 'target'>${condition.trials[iteration - 1].word}</span></h1>
        `,
            choices: ['f', 'j'],
        }
        timeline.push(wordDisplay);
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

    ]
}

timeline.push(survey);

//Results Save

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
