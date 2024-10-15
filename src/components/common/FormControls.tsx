import React from "react";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Input,
  TextField,
} from "@mui/material";

// Define types for props
interface Question {
  _id: string;
  question: string;
  required: boolean;
}

interface Option {
  _id: string;
  option: string;
}

interface MultipleChoiceProps {
  question: Question;
  options: Option[];
  onChange: (question: Question, value: string) => void;
  answered?: string;
}

interface CheckboxProps {
  question: Question;
  options: Option[];
  onChange: (
    question: Question,
    value: string,
    optionId: string,
    checked: boolean
  ) => void;
  answered?: string[];
}

interface ShortAnswerProps {
  question: Question;
  onChange: (question: Question, value: string) => void;
  showQuestionPaper?: boolean;
  answered?: string;
}

interface DateQuestionProps {
  question: Question;
  onChange: (question: Question, value: string) => void;
  answered?: string;
}

interface TimeQuestionProps {
  question: Question;
  onChange: (question: Question, value: string) => void;
  answered?: string;
}

// Multiple Choice Component
export const MultipleChoiceQuestion: React.FC<MultipleChoiceProps> = ({
  question,
  options,
  onChange,
  answered,
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-required={question.required}
        aria-label={question.question}
        name={question._id}
        aria-disabled={!!answered}
        onChange={(e) => onChange(question, e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option._id}
            checked={answered ? option.option === answered : undefined}
            value={option.option}
            control={<Radio color="success" />}
            label={option.option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

// Checkbox Component
export const CheckboxQuestion: React.FC<CheckboxProps> = ({
  question,
  options,
  onChange,
  answered,
}) => {
  const handleChange =
    (option: Option) =>
    (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
      onChange(question, "", option._id, checked);
    };

  return (
    <FormControl component="fieldset">
      <FormGroup aria-required={question.required} aria-disabled={!!answered}>
        {options.map((option) => (
          <FormControlLabel
            key={option._id}
            checked={answered ? answered.includes(option._id) : undefined}
            control={<Checkbox color="success" />}
            label={option.option}
            onChange={handleChange(option)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

// Short Answer Component
export const ShortAnswerQuestion: React.FC<ShortAnswerProps> = ({
  question,
  onChange,
  showQuestionPaper,
  answered,
}) => {
  return (
    <Input
      disabled={!!answered}
      color="success"
      fullWidth
      defaultValue={answered}
      onChange={(e) => onChange(question, e.target.value)}
      placeholder={showQuestionPaper ? "Your answer" : "Short test answer"}
      required={question.required}
    />
  );
};

// Date Question Component
export const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  onChange,
  answered,
}) => {
  return (
    <TextField
      disabled={!!answered}
      color="success"
      type="date"
      defaultValue={answered}
      onChange={(e) => onChange(question, e.target.value)}
      required={question.required}
    />
  );
};

// Time Question Component
export const TimeQuestion: React.FC<TimeQuestionProps> = ({
  question,
  onChange,
  answered,
}) => {
  return (
    <TextField
      disabled={!!answered}
      color="success"
      type="time"
      defaultValue={answered}
      onChange={(e) => onChange(question, e.target.value)}
      required={question.required}
    />
  );
};
