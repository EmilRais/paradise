export const isPresent = (value: any) => {
    return value !== undefined && value !== null;
};

export const isNumber = (value: any) => {
    return typeof value === "number";
};

export const isBoolean = (value: any) => {
    return typeof value === "boolean";
};

export const isString = (value: any) => {
    return typeof value === "string";
};
