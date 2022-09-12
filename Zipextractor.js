const choosefile = document.getElementById("choosefile")
const file = document.getElementById("file")
const droparea = document.getElementById("droparea")
const output = document.getElementById("output");
const trees = document.getElementById("tree")
const filename = document.getElementById("filename");
const filelist = document.getElementById("filelist");
const format = document.getElementById("format");
const more = document.getElementById("more");
const navlist = document.getElementById("navlist");
const icon = document.getElementById("toggleicon");
const progress = document.getElementById("progress");
const urllink = document.getElementById("urllink");

var zip = new JSZip();
var entrynames = [];
var filecontents =[];
var fileslist;
var entries = [];
var files = [];
var abc = [];
var aaa ={};


navlist.style.maxHeight = "0px";
icon.addEventListener("click",()=>{
    if(navlist.style.maxHeight == "0px"){
        navlist.style.maxHeight = "300px"
    }
    else{
        navlist.style.maxHeight = "0px"
    }
})

more.addEventListener("click",()=>{
    format.style.display = "block";
});
urllink.addEventListener("click",()=>{
    window.prompt("open file from URL","https://");
})
choosefile.addEventListener("click",click)
function click(){
    file.click();
    
};
droparea.addEventListener("dragover",function(event){
    event.preventDefault();
});

droparea.addEventListener("drop",(event) =>{
     event.preventDefault();
     droparea.style.display = 'none';
     progress.style.display = "flex";
     setTimeout(function(){
        progress.style.display = "none";
        output.style.display = "inline-block";
    },5000)

     function handleFile(f){

        
        JSZip.loadAsync(f)                                   
            .then(function(zip) {
                    fileslist = zip.files;
                zip.forEach(function (relativePath, zipEntry) { 
                    var names = zipEntry.name;
                    
                    entrynames.push(names);
                    entries.push(zipEntry);

                    
                });
            }
            );
     };
    var files = event.dataTransfer.files;
    for(var i = 0; i< files.length; i++){
        handleFile(files[i]);
};
setTimeout(function () {
      tree()
    }, 1000);
});
file.addEventListener("change",(event) => {
    droparea.style.display = 'none';
    progress.style.display = "flex";
    setTimeout(function(){
        progress.style.display = "none";
        output.style.display = "inline-block";
    },5000)
 
    
    function handleFile(f){
    
      
        
        JSZip.loadAsync(f)                                  
            .then(function(zip) {
                     fileslist = zip.files;
                zip.forEach(function (relativePath, zipEntry) {  
                    var names = zipEntry.name;
                    entrynames.push(names);
                    entries.push(zipEntry);
                    
                    
                });
            });
      
    };
    var files = event.target.files;
    for(var i = 0; i< files.length; i++){
        handleFile(files[i]);
    };
     setTimeout(function () {
      tree()
    }, 1000);
});

function tree(){

    aaa = entrynames.sort((a,b) => a.length - b.length);
    for(let i = 0; i<aaa.length;i++)
    {
        abc.push(aaa[i]);
    }
    for(let i = 0;i<abc.length;i++)
    {
        abc[i] = abc[i].slice((abc[i].indexOf("/"))+1,abc[i].length)
    }
    for(let x = 0; x<(aaa.length); x++){
         filecontents.push({"name": `${aaa[x]}`, "a_attr": {"href": "javascript.submitMe()"}})
    
    }
   
    createTree();

    setTimeout(function () {
        $("#tree").jstree("open_all");
    }, 1000);

    setTimeout(function () {
        clicked();
    }, 1000);

};




function createTree(){
    createJSTree(filecontents);
    
}

function createJSTree(filecontents) {          
    $('#tree').jstree({
        'core': {
            'data': abc
        },
        "plugins" : [ "themes", "html_data", "sort", "ui" ]
    });
    
}
function submitMe(){ 
    var result = $('#tree').jstree('get_selected');
    var firstentry = result[0].slice(3,result[0].length);
    
    for(let x = 0;x<filecontents.length;x++){
        var ff =filecontents[x]['name'];
        var name = fileslist[`${ff}`];
        files.push(name)
        
    }
    
        for (var i = 0; i < files.length; i++) {
            var f = files[firstentry - 1];

                    zip.file(f['name'], f._data);
                 }

                 
                 zip.generateAsync({type:"blob"}).then(function (Uint8Array) {
                    saveAs(Uint8Array, `${f['name']}`)                          
                })

} 

function clicked(){
    
    $('a').click(function(){
        setTimeout(function () {
            submitMe()
        }, 500);
    })

}


function downloadAll(){
    var bb = []
    for(let x = 0;x<entries.length;x++){

        bb.push(entries[x]._data)

    }

    for(let x = 0; x<bb.length;x++){

        zip.file(entries[x].name, bb[x]);
        zip.generateAsync({type:"blob"}).then(function (Uint8Array) {
            saveAs(Uint8Array, `${entries[x].name}`)                          
        })
   
        }
        }

    function refresh(){
        location.reload();
    }