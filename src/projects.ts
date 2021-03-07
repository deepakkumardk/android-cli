import chalk from "chalk"
import fse from "fs-extra"
import { replaceInFile } from "replace-in-file"
import { AppInfo } from "../types"

const templateProject = "HelloWorld"
const templatePackageName = "com.example.helloworld"

const getProjectDir = (projectName: string) => {
    const currentDir = process.cwd() + "/" + projectName
    return currentDir
}

const initProject = async ({ projectName, packageName, appName }: AppInfo) => {
    try {
        await fse.rename(
            process.cwd() + "/android-template",
            getProjectDir(projectName)
        )
    } catch (error) {
        console.log("error occurs while initializing project", error)
    }
    await replacePackageName({ projectName, packageName, appName })
    await renameFolders({ projectName, packageName, appName })
}

const replacePackageName = async ({
    projectName,
    packageName,
    appName,
}: AppInfo) => {
    const currentDir = getProjectDir(projectName)
    const files = [currentDir + "/**"]

    const options = {
        files: files,
        from: /com.example.helloworld/g,
        to: packageName,
        countMatches: true,
    }
    const projectNameOptions = {
        files: files,
        from: /HelloWorld/g,
        to: appName,
        countMatches: true,
    }
    try {
        await replaceInFile(options)
        await replaceInFile(projectNameOptions)
    } catch (error) {
        console.log(chalk.red("Error while initializing project " + error))
    }
}

/**
 *
 * @param param0 {{
 * projectName: string,
 * packageName: string,
 * }}
 */
const renameFolders = async ({ projectName, packageName }: AppInfo) => {
    let oldPath = templatePackageName.split(".").join("/")
    let newPath = packageName.split(".").join("/")

    oldPath = oldPath.substring(0, oldPath.lastIndexOf("/"))
    newPath = newPath.substring(0, newPath.lastIndexOf("/"))

    //First rename the com.example packages
    renameOneFolder({
        projectName,
        fileName: "test",
        oldPath,
        newPath,
    })
    renameOneFolder({
        projectName,
        fileName: "androidTest",
        oldPath,
        newPath,
    })
    renameOneFolder({
        projectName,
        fileName: "main",
        oldPath,
        newPath,
    })

    oldPath = newPath + "/helloworld"
    newPath = packageName.split(".").join("/")

    //Then rename the com.new.helloworld packages
    renameOneFolder({ projectName, fileName: "test", oldPath, newPath })
    renameOneFolder({
        projectName,
        fileName: "androidTest",
        oldPath,
        newPath,
    })
    renameOneFolder({ projectName, fileName: "main", oldPath, newPath })
}

const renameOneFolder = async ({
    projectName,
    fileName,
    oldPath,
    newPath,
}: any) => {
    const currentDir =
        getProjectDir(projectName) + "/app/src/" + fileName + "/java/" + oldPath
    const newDir =
        getProjectDir(projectName) + "/app/src/" + fileName + "/java/" + newPath
    try {
        await fse.rename(currentDir, newDir)
    } catch (error) {
        console.log(chalk.red("Error while initializing project " + error))
    }
}

export { initProject, replacePackageName }
