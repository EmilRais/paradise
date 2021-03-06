export const isPresent = (value: any) => {
    return value !== undefined && value !== null;
};

export const isBoolean = (value: any) => {
    return typeof value === "boolean";
};

export const isNumber = (value: any) => {
    return typeof value === "number";
};

export const isString = (value: any) => {
    return typeof value === "string";
};

export const isDate = (value: any) => {
    return value.constructor === Date;
};

export const isArray = (value: any) => {
    return value.constructor === Array;
};

export const isObject = (value: any) => {
    return value === Object(value);
};
