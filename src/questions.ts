import inquirer, { QuestionCollection } from "inquirer"

const askQuestions = (projectName: string) => {
    const questions: QuestionCollection = [
        {
            name: "appName",
            type: "input",
            message: "App Name",
            default: projectName,
            validate: (value: any) => {
                if (value) return true
                else return "Please enter a valid app name"
            },
        },
        {
            name: "packageName",
            type: "input",
            message: "Package Name",
            default: "com.example." + projectName,
            validate: (value: any) => {
                if (value) return true
                else return "Please enter a valid package name"
            },
        },
        {
            name: "minSdk",
            type: "input",
            message: "Minimum SDK",
            default: 21,
            validate: (value) => {
                const error = "Please enter a valid minimum SDK between 21 & 30"
                const sdk = parseInt(value)
                if (!sdk) return error
                else if (sdk > 20 && sdk < 31) return true
                else return error
            },
        },
    ]

    return inquirer.prompt(questions)
}

export { askQuestions }
