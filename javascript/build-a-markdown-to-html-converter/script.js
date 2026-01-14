const markdownInput = document.getElementById("markdown-input");

function convertMarkdown() {
    // Convert # into corresponding heading
    const headings = markdownInput.value.trimStart().replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Convert **text** into bold text
    const boldText = headings.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Convert __text__ into bold text
    const boldText2 = boldText.replace(/__(.*)__/gim, '<strong>$1</strong>');

    // Convert *text* into italic text
    const italicText = boldText2.replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Convert _text_ into italic text
    const italicText2 = italicText.replace(/_(.*)_/gim, '<em>$1</em>');

    // Convert images ![alt-text](image-source) into HTML links
    const images = italicText2.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2">');

    // Convert links [text](url) into HTML links
    const links = images.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Convert quotes > into blockquotes
    const blockquotes = links.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    document.getElementById("preview").innerHTML = blockquotes;
    document.getElementById("html-output").textContent = blockquotes;

    return blockquotes;
}

markdownInput.addEventListener("input", convertMarkdown);