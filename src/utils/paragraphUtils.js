import reduce from 'lodash/reduce';
import map from 'lodash/map';
import get from 'lodash/get';

const PARAGRAPH_SEPARATOR = "[!paragraph]";

const PT_TEXT = "[TEXT]";
const PT_IMAGE_START = "[IMG]";
const PT_IMAGE_END = "[/IMG]";

const PT_HEADER_START = "[HEADER]";
const PT_HEADER_END = "[/HEADER]";

const PT_QUOTE = "[QUOTE]";

export const HEADER_TYPE = "HEADER";
export const TEXT_TYPE = "TEXT";
export const IMAGE_TYPE = "IMAGE";
export const QUOTE_TYPE = "QUOTE";

function createImagePrefix(linkValue) {
    return PT_IMAGE_START + linkValue + PT_IMAGE_END;
}

function createTextPrefix() {
    return PT_TEXT;
}

function createHeaderPrefix(headerValue) {
    return PT_HEADER_START + headerValue + PT_HEADER_END;
}

export function paragraphsToText(paragraphs) {
    return reduce(paragraphs, (text, pObject) => text + (text !== "" ? PARAGRAPH_SEPARATOR : "") + pObjectToText(pObject), "");
}

export function textToParagraphs(text) {
    let splitted = text.split(PARAGRAPH_SEPARATOR);

    let counter = 0;
    let paragraphs = map(splitted, (pRaw) => {
        let parseValue = getType(pRaw);
        return {
            id: ++counter,
            paragraph: get(parseValue, "text", "unknown"),
            editor: false,
            type: get(parseValue, "type", PT_TEXT),
            header: get(parseValue, "header", undefined),
            imgLink: get(parseValue, "imgLink", undefined),
        }
    });

    return {
        lastId: counter,
        paragraphs: paragraphs
    };
}

function pObjectToText(pObject) {
    let type = get(pObject, "type", TEXT_TYPE);

    if (type === IMAGE_TYPE) {
        return createImagePrefix(pObject(pObject), "imgLink", "") + get(pObject, "paragraph");
    }
    else if (type === HEADER_TYPE) {
        return createHeaderPrefix(pObject(pObject), "header", 1) + get(pObject, "paragraph");
    }
    else if (type === QUOTE_TYPE) {
        return PT_QUOTE + get(pObject, "paragraph");
    } else {
        return PT_TEXT + get(pObject, "paragraph");
    }
}

function getType(pRaw) {
    if (pRaw.startsWith(PT_TEXT)) {
        return {
            type: TEXT_TYPE,
            text: getPTextAfterMark(pRaw, PT_TEXT)
        }
    }
    if (pRaw.startsWith(PT_QUOTE)) {
        return {
            type: QUOTE_TYPE,
            text: getPTextAfterMark(pRaw, PT_QUOTE)
        }
    }

    if (pRaw.startsWith(PT_HEADER_START)) {
        return {
            type: HEADER_TYPE,
            header: getHeaderValue(pRaw),
            text: getPTextAfterMark(pRaw, PT_HEADER_END)
        }
    }

    if (pRaw.startsWith(PT_IMAGE_START)) {
        return {
            type: IMAGE_TYPE,
            imgLink: getImageValue(pRaw),
            text: getPTextAfterMark(pRaw, PT_IMAGE_END)
        }
    }
    return null;
}

function getPTextAfterMark(pRaw, mark) {
    let markId = pRaw.indexOf(mark) + mark.length;
    return pRaw.substring(markId, pRaw.length);
}

function getHeaderValue(pRaw) {
    let startId = pRaw.indexOf(PT_HEADER_START) + PT_HEADER_START.length;
    let endId = pRaw.indexOf(PT_HEADER_END);
    return Number.parseInt(pRaw.substring(startId, endId));
}

function getImageValue(pRaw) {
    let startId = pRaw.indexOf(PT_IMAGE_START) + PT_IMAGE_START.length();
    let endId = pRaw.indexOf(PT_IMAGE_END);
    return pRaw.substring(startId, endId);
}