var save = {};

save.saveAsJson = function(textToWrite,fileNameToSaveAs){
    fileNameToSaveAs = fileNameToSaveAs + ".json";
    var format = "application/json";
    var textFileAsBlob = new Blob([textToWrite], {type:+"'"+format+"'"});

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL !== null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = save.destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
    return '';
};

save.destroyClickedElement = function (event){
    document.body.removeChild(event.target);
    return '';
};

save.loadFileAsText = function (fileToLoad) {
    var filecontent = '';
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        filecontent = fileLoadedEvent.target.result;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

    return filecontent;

};