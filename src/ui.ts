import chalk from "chalk"
import figlet from "figlet"

const initUI = () => {
    const title = chalk.green(figlet.textSync("Android  CLI"))
    console.log("\n\n", title, "\n\n")
}

export { initUI }
