// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const path = require('path')
const p = console.log.bind(console)
const fs = require("fs")
const window = vscode.window
const child_process = require('child_process')
const { cwd } = require('process')
const extensions = vscode.extensions
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// p(5345345)
	// p(process.env)
	// p(process.env.VSCODE_CWD)

	//Microsoft VS Code\resources\app  to  Microsoft VS Code\bin 



	context.subscriptions.push(vscode.commands.registerCommand('activate-extensions.show-enabled-extensions', async function () {
		try {
			const codePath = path.join(path.dirname(path.dirname(vscode.env.appRoot)), "bin")

			const extensionsList = child_process.execSync("code --list-extensions", { cwd: codePath }).toString().slice(0, -1).split('\n')

			// console.log(extensions.all);
			// p(Object.keys(extensions.all))



			// p(extensionsList)
			var length = extensionsList.length
			const activeExtensions = []
			var total = 0
			for (let i = 0; i < length; i++) {
				// const extensionObj = extensions.getExtension("ms-toolsai.jupyter")
				const extensionObj = extensions.getExtension(extensionsList[i])
				if (!extensionObj) { continue }

				// p(extensionObj)
				// p(Object.keys(extensionObj))
				activeExtensions.push(extensionsList[i])
				// p(extensionsList[i], extensionObj.isActive)
				total++
				// return

				// p(i, extensionsList[i])
			}

			p("total:", total)


			activeExtensions.forEach(element => {
				p(element)
			})


			// const appdataDir = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"), "vscode_activate-extensions")

			// await writeFile(path.join(appdataDir, "1.json"), JSON.stringify(activeExtensions), 'utf-8')

		} catch (error) {
			console.log(error)
			vscode.window.showInformationMessage(error)
		}
	}))

	context.subscriptions.push(vscode.commands.registerCommand('activate-extensions.use-extension-list', async function () {
		try {

			var packageJsonPath = path.join(__dirname, "package.json")
			if (!fs.existsSync(packageJsonPath)) {
				packageJsonPath = path.join(path.dirname(packageJsonPath), "package.json")
			}


			const jsonAr = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

			const appdataDir = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"), "vscode_activate-extensions")

			var extensionListFile
			// extensionListFile = await window.showQuickPick(["fwefwf", "65476", "kyukyuk"], { canPickMany: false })
			extensionListFile = "1.json"

			// p(JSON.parse(fs.readFileSync(path.join(appdataDir, extensionListFile), 'utf-8')))

			jsonAr.extensionDependencies = JSON.parse(fs.readFileSync(path.join(appdataDir, extensionListFile), 'utf-8'))

			// p(jsonAr)
			// p(JSON.stringify(jsonAr))

			await writeFile(packageJsonPath, JSON.stringify(jsonAr), 'utf-8')

		} catch (error) {
			console.log(error)
			vscode.window.showInformationMessage(error)
		}
	}))
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

function writeFile(filePath, contents, encoding) {
	fs.promises.mkdir(path.dirname(filePath), { recursive: true }).then(() => fs.promises.writeFile(filePath, contents, encoding))
}