#### Load Packages -----------------------------------
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")
library(ggplot2)

#### D-score Function --------------------------------
calculate_IAT_dscore <- function(data) {
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct==TRUE,]
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or men" |
                            tmp$expectedCategoryAsDisplayed == "liberal arts or women",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or women" |
                              tmp$expectedCategoryAsDisplayed == "liberal arts or men",]
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  dscore <- (incongruent_means - congruent_means) / pooled_sd
  
  return(dscore)
}
  
  #### Questionnaire Scoring Function ---------------
score_questionnaire <- function(data) {
  json_data <- data[data$trialType == "questionnaire", "response"]
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  rev_items <- c("Q1","Q3","Q5","Q7","Q9")
  for (rev_item in rev_items) {
    questionnaire[,rev_item] <- 6 - questionnaire[,rev_item]
  }
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### For Loop ------------------------------------------
i = 1
for (file in files_list) {
  tmp <- read.csv(file)
  column_names <- c("expectedCategoryAsDisplayed", "expectedCategory", "leftCategory", "rightCategory")
  tmp[,"correct"] <- as.logical(tmp[,"correct"])
  for(column_name in column_names) {
    tmp[,column_name] <- as.factor(tmp[,column_name])
  }
  participant_ID <- tools::file_path_sans_ext(basename(file))
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]  
  dScores[i,"participant_ID"] <- participant_ID
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  rm(tmp)
  i <- i + 1
}

#### ANOVA -------------------------------------------
iat_anova <- aov(dScores$d_score ~ dScores$whichPrime, dScores)
summary(iat_anova)

#### T-Test ---------------------------------------------
TukeyHSD(iat_anova, conf.level=.95)

#### Correlation ----------------------------------------
cor.test(dScores$d_score, dScores$questionnaire)

#### Base R Histogram -------------------------------
hist(dScores$d_score,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

#### ggplot Histogram --------------------------------
ggplot(dScores, aes(x=d_score)) +
  geom_histogram(binwidth = 0.1, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") +
  theme_classic() 

#### ggplot Histogram by Prime ---------------------
ggplot(dScores, aes(x=d_score)) +
  geom_histogram(binwidth = 0.1, fill = "skyblue", color = "black") +
  labs(title = "Distribution of D-Scores", x = "D-Scores", y = "Frequency") +
  theme_classic() +
  facet_wrap(~dScores$whichPrime)

#### ggplot Box Plot ----------------------------------
ggplot(dScores, aes(x=whichPrime, y=d_score)) +
  geom_boxplot() +
  labs(title = "Effect of Prime on D-Scores", x = "Prime Condition", y = "Frequency") +
  theme_classic() +
  theme(legend.position = "none") +
  scale_x_discrete(labels = c("Atypical","Stereotypical"))

#### ggplot Scatter Plot -------------------------------
ggplot(dScores, aes(x=questionnaire, y=d_score)) +
  geom_point() +
  labs(title = "Correlation Between Questionnaire and D-Scores", x = "Questionnaire", y = "D-Scores") +
  theme_classic() +
  geom_smooth(method = "lm")

#### ggplot Custom Theme ---------------------------
ggplot(dScores, aes(x=whichPrime, y=d_score)) +
  geom_boxplot(fill = c("orange", "skyblue")) +
  labs(title = "Effect of Prime on D-Scores", x = "Prime Condition", y = "Frequency") +
  theme(legend.position = "none", 
        text=element_text(family="mono", size = 15, color = "maroon")) +
  scale_x_discrete(labels = c("Atypical","Stereotypical")) +
  coord_cartesian(ylim = c(-1,1)) 