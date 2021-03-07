#!/usr/bin/env node

import chalk from "chalk"
import { Command } from "commander"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { cloneProject } from "./src/clone.mjs"

import { initProject } from "./src/projects.mjs"
import { askQuestions } from "./src/questions.mjs"
import { initUI } from "./src/ui.mjs"

let newAppInfo = {
    appName: "",
    projectName: "",
    packageName: "",
    minSdk: 21,
}
const runScript = async () => {
    const argv = yargs(hideBin(process.argv)).argv._

    if (!argv[1]) {
        console.error(chalk.red("Please enter a valid project name."))
        return
    }
    const projectName = argv[1]

    initUI()

    const answers = await askQuestions(projectName)
    newAppInfo = {
        appName: answers.appName,
        projectName,
        packageName: answers.packageName,
        minSdk: answers.minSdk,
    }

    try {
        await cloneProject()
        await initProject(newAppInfo)
        console.log(chalk.blue("Completed Successfully"))
    } catch (error) {
        console.log("error", error)
        process.exit(1)
    }
}

runScript()

const setupCommander = () => {
    const program = new Command()

    program
        .option("-d, --debug", "Output extra logs")
        .option("--template <type>", "Add template path")

    program.parse(process.argv)
    const options = program.opts()
}

// setupCommander()
