export const prompts: { [shortcut: string]: { message: string, type: number } } = {
    "File Hierarchy": { message: "Can you show me the file hierarchy of this GitHub repository project?", type: 0 },
    "Main Directories": { message: "What are the main directories in the project?", type: 0 },
    "Submodules": { message: "Can you list all the submodules or subprojects present in this repository?", type: 0 },
    "Articles": { message: "Could you recommend some articles related to this repository?", type: 3 }
};

export const subprompts = {
    "Explain": "Explain the purpose and functionality of this code: ",
    "Improve": "Review and suggest improvements to this code: ",
    "ExplainFile": "Explain the purpose and functionality of ",
    "ImproveFile": "Review and suggest improvements to ",
}

export const tutorialMessages = [
    "Do you want to take a brief tour through the app?",
    "In this section, you'll find repository data, accompanied by conveniently placed GitHub links.",
    "Navigate an interactive graph representation. Clicking nodes provides more data from folder or code from the file.",
    "Discover advanced code analysis by highlighting the code or clicking the filename of selected file.",
    "Utilize the prompt bar to generate answers from repository insights."
]

export const layout = "cose";

export const shortenedWordLength = 12;