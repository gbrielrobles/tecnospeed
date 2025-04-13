import path from "path"
export function fromRoot(...paths : string[]) {
    return path.join(process.cwd(), ...paths)
}