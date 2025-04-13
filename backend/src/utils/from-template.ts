import path from "path"

export function fromRootTemplate(...paths: string[]) {
    return path.join(process.cwd(), 'public', 'templates', ...paths);
}