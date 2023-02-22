import { BaseStart, BaseUpdate, ShipStart, ShipUpdate } from "../aiControls"

/**
 * Wrapper around cookies
 */
export async function storeCodeLocally(code) {
    let codeList = JSON.parse(localStorage.getItem("codeList")) ?? {}
    codeList[code.name] = code
    localStorage.setItem("codeList", JSON.stringify(codeList))
    setActiveCode(code.name)
}

export function setActiveCode(name) {
    localStorage.setItem("activeCode", name)
}

export function loadLastCode() {
    let name = localStorage.getItem("activeCode")
    let codeList =  JSON.parse(localStorage.getItem("codeList")) ?? {}

    // Load default code when user doesn't have any code whatsover saved locally
    return codeList[name] ?? { baseStart: BaseStart, baseUpdate: BaseUpdate, shipStart: ShipStart, shipUpdate: ShipUpdate }
}

export function getAllLocalCode() {
    return JSON.parse(localStorage.getItem("codeList")) ?? {}
}

export function deleteCodeLocally(name) {
    let codeList = JSON.parse(localStorage.getItem("codeList")) ?? {}
    delete codeList[name]
    localStorage.setItem("codeList", JSON.stringify(codeList))
}