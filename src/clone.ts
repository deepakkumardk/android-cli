import ora from "ora"
import shelljs from "shelljs"

const cloneProject = async () => {
    // const loader = ora().start()
    const command =
        "git clone https://github.com/deepakkumardk/android-template"

    return new Promise((resolve, reject) =>
        shelljs.exec(command, {}, (code, value, error) => {
            if (code != 0) {
                return reject(error)
            }
            resolve(value)
        })
    )
}

export { cloneProject }
