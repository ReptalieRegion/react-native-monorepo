export default function isObjEmpty(obj: Object) {
    for (const _key in obj) {
        return false;
    }
    return true;
}
