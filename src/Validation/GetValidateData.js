const getDataType = (e) => typeof (e);

export function getValidatedData(data, type = 'string', onlyValidate = false) {
    const dataTypes = {
        "string": "",
        "array": [],
        "bigint": 0,
        "number": 0,
        "null": null,
        "undefined": undefined,
        "boolean": false,
        "object": {},
        "function": () => { },
    }
    if (onlyValidate) {
        if (type.toLowerCase() === 'array' && Array.isArray(data)) {
            return true;
        }
        return (data && getDataType(data).toLowerCase() === type.toLowerCase());
    } else {
        if (getDataType(data) === type.toLowerCase()) {
            if(type.toLowerCase()==='object' && data===null){
                return {};
            }
            return data;
        } else {
            if (type.toLowerCase() === 'array' && Array.isArray(data)) {
                return data;
            } else {
                try {
                    return dataTypes[type];
                } catch (e) {
                    return false;
                }
            }
        }
    }
}