setwd("~/Desktop/psy1903/stats")
dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")
setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")
if (!require("pacman")) {install.packages("pacman"); require("pacman")} 
p_load("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite")

iat_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/gender-major-iat-2024-11-05-21-51-39.csv", header = TRUE, sep = ",", na.strings = "NA")
str(iat_data1)
summary(iat_data1)

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "science or women" |
                        iat_data1$expectedCategoryAsDisplayed == "liberal arts or men" |
                        iat_data1$expectedCategoryAsDisplayed == "science or men" |
                         iat_data1$expectedCategoryAsDisplayed == "liberal arts or women",
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]
str(iat_data2)

iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)

column_names <- c("expectedCategoryAsDisplayed", "expectedCategory", "leftCategory", "rightCategory")
for(column_name in column_names) {
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
}

str(iat_data2)

calculate_IAT_dscore <- function(data) {
  # Step 1: Filter out trials <300 & >3000
 tmp <- data[data$rt > 300 & data$rt < 3000,]
  # Step 2: Separate congruent & incongruent
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or men" |
                            tmp$expectedCategoryAsDisplayed == "liberal arts or women",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "science or women" |
                            tmp$expectedCategoryAsDisplayed == "liberal arts or men",]
  # Step 3: calculate mean & stdev
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_trials <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  # Step 4: Calculate D-Score
  dscore <- (congruent_means - incongruent_trials) / pooled_sd
  
  return(dscore)
}
 calculate_IAT_dscore()
  
 
 ## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
 directory_path <- "~/Desktop/psy1903/osfstorage-archive"
 
 ## Create a list of all the files in that directory.
 files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
 
 ## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
 ## IAT
 dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))
 
 ## Rename the default column names to something meaningful
 ## IAT
 colnames(dScores) <- c("participant_ID", "d_score")
 
 ## Initiate variable i to represent row numbers for each iteration, starting with 1
 i = 1
 
 ## Now fill in the remaining code following the commented instructions:
 
 ## Initiate a for loop that iterates across each file in files_list
 file <- files_list[[1]]
 for (file in files_list) {
   tmp <- read.csv(file)
   participant_ID <- tools::file_path_sans_ext(basename(file))
   dScores[i,"participant_ID"] <- participant_ID
   dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
   rm(tmp)
   i <- i + 1
 }
 # Use read.csv to read in your file as a temporary data frame called tmp
 
 # Assign participant_ID as the basename of the file
 
 # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
 
 # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
 
 # Remove the temporary data file tmp  
 
 # Increase our row number variable i by one for the next iteration
 
 ## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
 write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)
 
 #### Questionnaire Scoring -----------------------------------------------------
 
 ## Read in data file to a data frame called iat_test
 iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")
 
 ## Extract questionnaire data
 json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]
 
 ## Use fromJSON to Convert from JSON to data frame
 questionnaire <- fromJSON(json_data)
 str(questionnaire)
 questionnaire <- as.data.frame(questionnaire)
 
 ## Convert to numeric
 questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
 
 
 ## Reverse score if necessary
 rev_items <- c("question1","question3","question5","question7","question9")
 for (rev_item in rev_items) {
   questionnaire[,rev_item] <- 8 - questionnaire[,rev_item]
 }
 
 ## Calculate mean or sum score
 score <- rowMeans(questionnaire, na.rm = TRUE)