import reduce from 'lodash/reduce';
import map from 'lodash/map';

const PARAGRAPH_SEPARATOR = "[!paragraph]";
const PARAGRAPH_TYPE = "[PT=";

const PT_TEXT = "TEXT";
const PT_IMAGE = "IMAGE";

export function paragraphsToText(paragraphs) {
    return reduce(paragraphs, (text, p) => text + (text !== "" ? PARAGRAPH_SEPARATOR : "") + p.paragraph, "");
}

export function textToParagraphs(text) {
    let splitted = text.split(PARAGRAPH_SEPARATOR);

    let counter = 0;
    let paragraphs = map(splitted, (value) => {
        return {
            id: ++counter,
            paragraph: value,
            editor: false
        }
    });

    return {
        lastId: counter,
        paragraphs: paragraphs
    };
}