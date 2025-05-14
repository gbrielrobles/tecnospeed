import * as crypto from "crypto"

export function generateHash(data): string {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}