document.getElementById('inputText').addEventListener('input', function () {
    const inputText = document.getElementById('inputText').value;
    const fixedText = fixLines(inputText);
    document.getElementById('outputText').textContent = fixedText;
});

document.getElementById('copyButton').addEventListener('click', function () {
    document.getElementById('searchText').value = '';
    const outputText = document.getElementById('outputText').textContent;
    navigator.clipboard.writeText(outputText)
});

function fixLines(text) {
    let lines = text.split(/\n/);
    let result = [];
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(/\*\*\*/g, '');
        if (lines[i].includes('---')) {
            result.push('');
            result.push('_____________________');
            result.push('');
            continue;
        }
        if (i < lines.length - 1 && !lines[i].trim().endsWith('۔') && !lines[i].trim().endsWith('؟')) {
            lines[i + 1] = lines[i].trim() + ' ' + lines[i + 1].trim();
            lines[i] = '';
        }
        if (lines[i].trim() !== '') {
            result.push(lines[i]);
        }
    }
    return result.join('\n').trim();
}

// Google Transliterate API

const searchBox = document.getElementById('searchText');
const textBox = document.getElementById('inputText');
google.load("elements", "1", {
    packages: "transliteration"
  });

function onLoad() {
var options = {
    sourceLanguage:
        google.elements.transliteration.LanguageCode.ENGLISH,
    destinationLanguage:
        [google.elements.transliteration.LanguageCode.URDU],
    shortcutKey: 'ctrl+g',
    transliterationEnabled: true
};

var control =
    new google.elements.transliteration.TransliterationControl(options);
control.makeTransliteratable(['searchText']);
}
google.setOnLoadCallback(onLoad);

// Search feature

searchBox.addEventListener('input', function() {
    const searchText = searchBox.value;
    let textValue = textBox.value;
    const clearedText = textValue.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
    
    if (searchText) {
        const regex = new RegExp(searchText, 'gi');
        textValue = clearedText.replace(regex, '***$&***');
    } else {
        textValue = clearedText;
    }

    textBox.value = textValue;
});