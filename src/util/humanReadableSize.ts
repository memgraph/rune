export const humanReadableSize = (kilobytes: number): string => {
    const units = ['B', 'kB', 'MB', 'GB', 'TB'];
    let size = kilobytes * 1024;

    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2) + units[unitIndex]}`;
}
