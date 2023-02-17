/**
 * Wrapper around cookies
 */
export async function storeCodeLocally(code) {

    let codeList = JSON.parse(localStorage.getItem("codeList")) ?? {}
    // console.log(codeList)
    codeList[code.name] = code
    // console.log(codeList)
    localStorage.setItem("codeList", JSON.stringify(codeList))
    // console.log(localStorage.getItem("codeList"))

    localStorage.setItem(code.name, code)
}

export function getAllLocalCode() {
    return JSON.parse(localStorage.getItem("codeList")) ?? {}
}

export function deleteCodeLocally(name) {
    let codeList = JSON.parse(localStorage.getItem("codeList")) ?? {}
    delete codeList[name]
    localStorage.setItem("codeList", JSON.stringify(codeList))
}