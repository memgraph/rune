const getFileExtension = (filename: string): string | null => {
    const re = /(?:\.([^.]+))?$/;
    const result = re.exec(filename);
    return result && result[1] ? result[1] : null;
};

export default getFileExtension;