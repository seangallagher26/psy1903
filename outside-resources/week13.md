# Outside Resources Log - Week 13


## AI Prompts
+ Explain this error:
```js
Error in `fortify()`:
! `data` must be a <data.frame>, or an object coercible by `fortify()`, or a
  valid <data.frame>-like object coercible by `as.data.frame()`.
Caused by error in `.prevalidate_data_frame_like_object()`:
! `dim(data)` must return an <integer> of length 2.
Run `rlang::last_trace()` to see where the error occurred.
```
+ How do i fix the legend part
```js ggplot(dScores, aes(x=whichPrime, y=d_score)) +
  geom_boxplot(fill = "skyblue", color = "black") +
  labs(title = "Effect of Prime on D-Scores", x = "Prime Condition", y = "Frequency") +
  theme_classic(legend()) 
  ```

+ why is my regression line returning an error
```js
ggplot(dScores, aes(x=questionnaire, y=d_score)) +
  geom_point() +
  labs(title = "Correlation Between Questionnaire and D-Scores", x = "Questionnaire", y = "D-Scores") +
  theme_classic() +
  method = "lm" 
  ```

## Outside sites
+ https://bookdown.org/ndphillips/YaRrr/correlation-cor-test.html

+ https://www.datacamp.com/tutorial/make-histogram-basic-r

+ https://www.datacamp.com/cheat-sheet/ggplot2-cheat-sheet

