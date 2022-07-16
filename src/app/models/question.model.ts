export namespace QuestionModel {
    export interface Full {
        id?: number;
        text: string;
        difficulty: "Beginner" | "Intermediate" | "Expert";
        options: Option[];
        answer: "1" | "2" | "3" | "4";
    }

    export interface Option {
        value: "1" | "2" | "3" | "4";
        description: string;
    }
}