#!/usr/bin/env node

import chalk from "chalk"
import { Command } from "commander"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { cloneProject } from "./src/clone"

import { initProject } from "./src/projects"
import { askQuestions } from "./src/questions"
import { initUI } from "./src/ui"
import { AppInfo } from "./types"

const program = new Command()

let newAppInfo: AppInfo = {
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

const setupCommander = () => {
    program
        .option("-d, --debug", "Output extra logs")
        .option("--template <type>", "Add template path")

    program.parse(process.argv)
    const options = program.opts()
}

setupCommander()
runScript()
