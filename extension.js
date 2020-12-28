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

	// p(process.env)
	// p(process.env.VSCODE_CWD)

	//Microsoft VS Code\resources\app  to  Microsoft VS Code\bin 
/* 	const codePath = path.join(path.dirname(path.dirname(vscode.env.appRoot)), "bin")

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

	const appdataDir = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"), "vscode_activate-extensions")

 */
	// fs.writeFileSync(path.join(appdataDir, "1.json"), JSON.stringify(activeExtensions), 'utf-8')

	// await writeFile(path.join(appdataDir, "1.json"), JSON.stringify(activeExtensions), 'utf-8')

	let disposable = vscode.commands.registerCommand('activate-extensions.helloWorld', async function () {
		try {

			console.log(vscode.extensions.all)
			return





			extensionListFile = await window.showQuickPick(["fwefwf", "65476", "kyukyuk"], { canPickMany: false })
			jsonAr.extensionDependencies = {}

		} catch (error) {
			console.log(error)
		}
		// vscode.window.showInformationMessage('Hello World from activate extensions!')
	})

	context.subscriptions.push(disposable)
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