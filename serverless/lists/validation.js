const minTitleLength = 1;
const maxTitleLength = 140;
const minTotalLines = 1;
const maxTotalLines = 140;
const minLineLength = 1;
const maxLineLength = 140;

export const isValidRequestData = requestData => {
    let valid = false;

    if(!requestData.title) {
        console.log('Title missing.');
    } else if(!(requestData.title.length >= minTitleLength)) {
        console.log('Title is not above minimum length.');
    } else if(!(requestData.title.length <= maxTitleLength)) {
        console.log('Title is not under or equal to maximum length.');
    } else if(!(requestData.lines)) {
        console.log('Lines array is missing.');
    } else if(!(requestData.lines.length >= minTotalLines)) {
        console.log('Lines array is not above minimum length.');
    } else if(!(requestData.lines.length <= maxTotalLines)) {
        console.log('Lines array is not under or equal to maximum length.');
    } else {
        requestData.lines.forEach((line, i) => {
            if(!(line.length >= minLineLength)) {
                console.log(`Line[${i}] is not above minimum length.`)
            } else if(!(line.length <= maxLineLength)) {
                console.log(`Line[${i}] is not under or equal to maximum length.`)
            } else {
                //All checks passed!
                valid = true;
            }
        });
    }
    return valid;
};