import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  userForm: FormGroup;
  quizStarted = false;
  quizFinished = false;
  usernameEntered = false;
  quizResult = '';
  username = '';
  quizForm: FormGroup;
  activeIndex = 0;
  points = 0;
  questions: QuestionModel.Full[] = [];
  loading = false;
  constructor(private fb: FormBuilder, private quizService: QuizService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required]
    });

    this.quizForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  fethQuestions(category: string) {
    this.loading = true;
    this.quizService.get<QuestionModel.Full>({
      route: 'questions',
      category
    }).subscribe((value) => {
      this.questions = value;
      this.loading = false;
    })
  }

  setUsername() {
    if (!this.userForm.valid) {
      return;
    }
    this.username = this.userForm.value.username;
    this.userForm.reset();
    this.usernameEntered = true;
  }

  chooseQuiz(quizCategory: string) {
    this.fethQuestions(quizCategory);
    this.quizStarted = true;
  }

  submitAnswer() {
    if (!this.quizForm.valid) {
      return;
    }

    if (this.quizForm.value.answer === this.questions[this.activeIndex]?.answer) {
      this.points += 3;
    }

    if (this.activeIndex + 1 < this.questions.length) {
      this.activeIndex += 1;
      this.quizForm.reset();
    } else {
      this.quizResult = `your point: ${this.points}`;
      this.quizFinished = true;
    }
  }

  generateResultText(point: number) {
    const gradeLevels = {
      "NOT_GOOD": 3,
      "BEGINNER": 9,
      "INTERMEDIATE": 12,
      "EXPERT": 15 
    }
    let text = '';
    if (point > 0 && point <= gradeLevels["NOT_GOOD"]) {
      text = `You need to practice more!`;
    } else if (point > gradeLevels["NOT_GOOD"] && point <= gradeLevels["BEGINNER"]) {
      text = `Keep on practicing!`;
    } else if (point > 10 && point <= gradeLevels["INTERMEDIATE"]) {
      text = `You are intermediate!`;
    } else if (point === 0) {
      text = 'You need to practice!';
    } else{
      text = `You are expert!`;
    }
    return text;
  }

  resetQuiz() {
    this.points = 0;
    this.activeIndex = 0;
    this.quizForm.reset();
    this.quizFinished = false;
  }

}
