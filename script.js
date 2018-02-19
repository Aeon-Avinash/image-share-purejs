
    let myPicturesArray = [
        {
            "albumId": 1,
            "id": 101,
            "title": "water - the abundance that made life possible",
            "url": "https://source.unsplash.com/daily?water",
            "thumbnailUrl": "https://source.unsplash.com/daily?water",
            "isPrivate": false
        },
        {
            "albumId": 1,
            "id": 102,
            "title": "wonders of nature",
            "url": "https://source.unsplash.com/daily?nature",
            "thumbnailUrl": "https://source.unsplash.com/daily?nature",
            "isPrivate": false
        },
        {
            "albumId": 1,
            "id": 103,
            "title": "forest - the lungs of the planet",
            "url": "https://source.unsplash.com/daily?forest",
            "thumbnailUrl": "https://source.unsplash.com/daily?forest",
            "isPrivate": false
        },
        {
            "albumId": 1,
            "id": 104,
            "title": "nature's diversity of life",
            "url": "https://source.unsplash.com/daily?wildlife",
            "thumbnailUrl": "https://source.unsplash.com/daily?wildlife",
            "isPrivate": false
        },
        {
            "albumId": 2,
            "id": 201,
            "title": "our street life",
            "url": "https://source.unsplash.com/daily?street",
            "thumbnailUrl": "https://source.unsplash.com/daily?street",
            "isPrivate": false
        },
        {
            "albumId": 2,
            "id": 202,
            "title": "we celebrate to share joy",
            "url": "https://source.unsplash.com/daily?celebration",
            "thumbnailUrl": "https://source.unsplash.com/daily?celebration",
            "isPrivate": false
        },
        {
            "albumId": 2,
            "id": 203,
            "title": "our ever-expanding cities",
            "url": "https://source.unsplash.com/daily?city",
            "thumbnailUrl": "https://source.unsplash.com/daily?city",
            "isPrivate": false
        },
        {
            "albumId": 2,
            "id": 204,
            "title": "we are always in rush",
            "url": "https://source.unsplash.com/daily?rush",
            "thumbnailUrl": "https://source.unsplash.com/daily?rush",
            "isPrivate": false
        },
        {
            "albumId": 3,
            "id": 301,
            "title": "humans' most potent weapon: pollution",
            "url": "https://source.unsplash.com/daily?pollution",
            "thumbnailUrl": "https://source.unsplash.com/daily?pollution",
            "isPrivate": false
        },
        {
            "albumId": 3,
            "id": 302,
            "title": "moving to a warmer and dryer future",
            "url": "https://source.unsplash.com/daily?drought",
            "thumbnailUrl": "https://source.unsplash.com/daily?drought",
            "isPrivate": false
        },
        {
            "albumId": 3,
            "id": 303,
            "title": "melting ice and rising sea levels",
            "url": "https://source.unsplash.com/daily?arctic,ice",
            "thumbnailUrl": "https://source.unsplash.com/daily?arctic,ice",
            "isPrivate": false
        },
        {
            "albumId": 3,
            "id": 304,
            "title": "eventually we are the ones that suffer",
            "url": "https://source.unsplash.com/daily?protest",
            "thumbnailUrl": "https://source.unsplash.com/daily?protest",
            "isPrivate": false
        }
    ];

    var albumsArray = [];
    

window.onload = init;

function init() {

    var albumList = document.getElementById('albumList');
    var album = $('#albumList').children();
    var nosAlbum = $('#albumList').children().length;
    console.log("album : " + album + "nosAlbum : " + nosAlbum );
    
    for (var i = 0; i < nosAlbum; i++) {
        albumsArray.push(album[i]);
        console.log("album no. " + (i+1) + " :" + album[i]);
        console.log(albumsArray);
        album[i].setAttribute("albumId", i+1);
        var idEnd = i + 1;
        var newAlbumId = "albumId" + idEnd;
        album[i].setAttribute("id", newAlbumId);
        album[i].addEventListener('click', setupListPill, false);
    }


    myPicturesArray.forEach(function(currentImage){
    // default loading the first album

        if(currentImage.albumId === 1) {
            let image = document.createElement("img");
            let aTile = document.createElement("a");

            image.src = currentImage.thumbnailUrl;
            image.alt = currentImage.title;
            image.width = 275;

            aTile.appendChild(image);
            aTile.href = "/#" + currentImage.url;
            document.querySelector('#galleryDiv').appendChild(aTile);
            image.classList.add("imageThumbStyle");

            aTile.addEventListener("click", showImageModal, false);
            aTile.setAttribute("data-toggle", "modal");
            aTile.setAttribute("data-target", "#displayImageModal");

            if(currentImage.isPrivate === false) {
                var button = document.createElement("button");
                var btnText = document.createTextNode("delete");
                button.appendChild(btnText);
                button.classList.add("btn", "btn-warning", "buttonStyle");
                aTile.appendChild(button);

                button.setAttribute("data-toggle", "modal");
            //    button.setAttribute("data-target", "#confirmDeleteModal"); 
                button.setAttribute("deleteImageId", currentImage.id);
                
                button.addEventListener('click', function(event){
                    $('#confirmDeleteModal').modal('show');
                    console.log(event.target);
                    var deleteImageId = parseInt(event.target.getAttribute("deleteImageId")); 
                    var deleteImageConfirm = document.querySelector('#deleteImageConfirm');
                    deleteImageConfirm.addEventListener("click", function(event) {
                        deleteCurrentImage(deleteImageId);
                    }, false); 
                });
            }
        }
    });

    var addImageButton = document.querySelector('#addImageButton');
    addImageButton.addEventListener('click', showAddImageModal, false);

    var createAlbumButton = document.querySelector('#newAlbumButton');
    createAlbumButton.addEventListener('click', showCreateAlbumModal, false);
}


function setupListPill(event) {
    var allTabs = document.getElementsByClassName('tab');
    for(var j = 0; j < allTabs.length; j++) {
        allTabs[j].classList.remove('active');
    }
    this.classList.add('active');

    // selecting the clicked album id
    var selectAlbumId = parseInt(this.getAttribute("albumId"));
    showThisAlbum(selectAlbumId);
}


function showThisAlbum(albumId) {
    // removing the gallery images
    var galleryDiv = document.querySelector('#galleryDiv');
    while(galleryDiv.hasChildNodes()) {
        galleryDiv.removeChild(galleryDiv.firstChild);
    }

    console.log("showing album : " + albumId);
    myPicturesArray.forEach(function(currentImage) {
        // adding images of the current album
        if(currentImage.albumId === albumId) {
            console.log("displaying album : " + albumId);
            let image = document.createElement("img");
            let aTile = document.createElement("a");

            image.src = currentImage.thumbnailUrl;
            image.alt = currentImage.title;
            image.width = 275;

            aTile.appendChild(image);
            aTile.href = "/#" + currentImage.url;
            document.querySelector('#galleryDiv').appendChild(aTile);
            image.classList.add("imageThumbStyle");

            aTile.addEventListener("click", showImageModal, false);
            aTile.setAttribute("data-toggle", "modal");
            aTile.setAttribute("data-target", "#displayImageModal");

            if(currentImage.isPrivate === false) {
                var button = document.createElement("button");
                var btnText = document.createTextNode("delete");
                button.appendChild(btnText);
                button.classList.add("btn", "btn-warning");
                aTile.appendChild(button);

                button.setAttribute("data-toggle", "modal");
                //    button.setAttribute("data-target", "#confirmDeleteModal"); 
                button.setAttribute("deleteImageId", currentImage.id);
                
                button.addEventListener('click', function(event){
                    $('#confirmDeleteModal').modal('show');
                    console.log(event.target);
                    var deleteImageId = parseInt(event.target.getAttribute("deleteImageId")); 
                    var deleteImageConfirm = document.querySelector('#deleteImageConfirm');
                    deleteImageConfirm.addEventListener("click", function(event) {
                        deleteCurrentImage(deleteImageId);
                    }, false); 
                });
            }
        }
    });
}



function showImageModal(event) {
    var image = this.firstElementChild;
    arr = this.href.split('#');
    var title = document.createTextNode(image.alt);

    var newImage = document.createElement("img");
    newImage.src = arr[arr.length - 1];
    newImage.alt = image.alt;
    var modalWidth = $('#displayImageModal').width();
    newImage.width = modalWidth * 0.75;


    if (window.innerWidth < 768) {
        var reductFactor = 0.65;
    } else {
        var reductFactor = 0.75;
    }

    if (window.innerHeight < window.innerWidth) {
        newImage.style.height = reductFactor * window.innerHeight;
        newImage.style.width = "auto"; 
    } else {
        newImage.style.width = reductFactor * window.innerWidth;
        newImage.style.height = "auto"; 
    }  
    
    
    document.querySelector('#titleModal').innerHTML = newImage.alt;
    document.querySelector('#imageModal').appendChild(newImage);


    var currentModal = document.querySelector('#displayImageModal');

    console.log("imageModal width: " + currentModal.offsetWidth);
    console.log("newImage.width : " + newImage.width);

    if(newImage.width > newImage.height) {
        if(newImage.width > 1000)
        document.querySelector('#imageModal').classList.remove("col-md-offset-2");
        console.log("image modal offset cleared");
    } else {
        document.querySelector('#imageModal').classList.add("col-md-offset-2");
    }
    
//    currentModal.addEventListener('hidden.bs.modal', clearImageModal, false);
//    had to resort to using jquery for the bootstrap modal fired events
//    couldn't work out the way around with native js implementation of BS    
    $('#displayImageModal').on('hidden.bs.modal', clearImageModal);
}

function clearImageModal(event) {
    
    var imageModalDiv = document.querySelector('#imageModal');
    console.log("call made to the hide modal event");
    while(imageModalDiv.hasChildNodes()) {
        imageModalDiv.removeChild(imageModalDiv.firstChild);
        console.log("clearing images");
    }
    
}

function showAddImageModal(event) {
    console.log("addImageModal called");
    var uploadImageConfirm = document.querySelector('#uploadImageConfirm');
    uploadImageConfirm.addEventListener('click', function(){
        var currentModalId = event.target.getAttribute('id');
        console.log("currentModalId: " + currentModalId);
        verifyAndSaveImage(currentModalId);
    }, false);

    $('#addImageModal').on('hidden.bs.modal', function(event) {
        console.log("accessing the addImageModal Hidden event");
        var currentModalId = event.target.getAttribute('id');
        console.log("currentModalId: " + currentModalId);
        fadeResetAddModal(currentModalId);
    });
}

function showCreateAlbumModal(event) {
    console.log("createAlbumModal called");
    var createAlbumConfirm = document.querySelector('#createAlbumConfirm');
    createAlbumConfirm.addEventListener('click', function(){
        var currentModalId = event.target.getAttribute('id');
        console.log("currentModalId: " + currentModalId);
        verifyAndSaveImage(currentModalId);
    }, false);

    $('#createAlbumModal').on('hidden.bs.modal', function(event) {
        console.log("accessing the createAlbumModal Hidden event");
        var currentModalId = event.target.getAttribute('id');
        console.log("currentModalId: " + currentModalId);
        fadeResetAddModal(currentModalId);
    });
}


function verifyAndSaveImage(modalId) {
    console.log(modalId);
    console.log("trying to validate the form input and then save");
    
    if(modalId === "addImageButton") {
        var uploadImageTitle = document.querySelector('#uploadImageTitle');
        var uploadImageSource = document.querySelector('#uploadImageSource');

        var thisTitle = uploadImageTitle.value;
        var thisSource = uploadImageSource.value;
        var errorSource = document.querySelector('#errorSource');
        document.querySelector('#imageVerified').style.display = "none";
        document.querySelector('#errorSource').style.display = "block";
    
        var checkURLType = checkURL(thisSource);
        if(checkURLType) {
            errorSource.innerHTML = "";
            checkValidImage(thisSource, verify, thisTitle, modalId);
            
        } else {
            errorSource.innerHTML = "please enter a valid URL for an Image only";
        }
    }

    if(modalId === "newAlbumButton") {
        var uploadImageTitle = document.querySelector('#newAlbumImageTitle');
        var uploadImageSource = document.querySelector('#newAlbumImageSource');

        var thisTitle = uploadImageTitle.value;
        var thisSource = uploadImageSource.value;
        var errorSource = document.querySelector('#errorSourceAlbumModal');
        document.querySelector('#imageVerifiedAlbumModal').style.display = "none";
        document.querySelector('#errorSourceAlbumModal').style.display = "block";
    
        var checkURLType = checkURL(thisSource);
        if(checkURLType) {
            errorSource.innerHTML = "";
            checkValidImage(thisSource, verify, thisTitle, modalId);
        } else {
            errorSource.innerHTML = "please enter a valid URL for an Image only";
        }
    }
}


function fadeResetAddModal(modalId) {
    console.log("clearing modal data");
    var galleryDiv = document.querySelector('#galleryDiv');

    if(modalId === "addImageModal") {
        document.querySelector('#uploadImageTitle').value = "";
        document.querySelector('#uploadImageSource').value = "";
    
        document.querySelector('#imageVerified').style.display = "none";
        document.querySelector('#errorSource').style.display = "none";
    }
    
 
    if(modalId === "createAlbumModal") {
        document.querySelector('#newAlbumName').value = "";
        document.querySelector('#newAlbumImageTitle').value = "";
        document.querySelector('#newAlbumImageSource').value = "";

        document.querySelector('#imageVerifiedAlbumModal').style.display = "none";
        document.querySelector('#errorSourceAlbumModal').style.display = "none";

        console.log("form fields also cleared for " + modalId);
    } 
 

}

function checkURL(url) {
    console.log(url);
    console.log((url.match(/\.(jpeg|jpg|gif|png)$/) != null));
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}



function checkValidImage(url, callback, title, modalId, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "error", title, modalId);
        }
    };
    img.onload = function() {
        if (!timedOut) {
            clearTimeout(timer);
            callback(url, "success", title, modalId);
            return true;
        }
    };
    img.src = url;
    timer = setTimeout(function() {
        timedOut = true;
        // reset .src to invalid URL so it stops previous
        // loading, but doesn't trigger new load
        img.src = "//!!!!/test.notaValidImage";
    //    document.querySelector('#uploadImageSource').value = "//!!!!/test.notaValidImage";
        callback(url, "timeout", title, modalId);
    }, timeout); 
}


function verify(url, result, title, modalId) {
    if(result === "timeout" || result === "error"){
        if(modalId === "addImageButton") {
            document.querySelector('#errorSource').innerHTML =
            "please enter a valid working URL of an Image file";
        }
        if(modalId === "newAlbumButton") {
            document.querySelector('#errorSourceAlbumModal').innerHTML =
            "please enter a valid working URL of an Image file";
        }
        
        
    } else if (result === "success") {

        if(modalId === "addImageButton") {
            document.querySelector('#errorSource').innerHTML = "";
            document.querySelector('#errorSource').style.display = "none";
            document.querySelector('#imageVerified').style.display = "block";

            document.querySelector('#uploadImageTitle').value = "";
            document.querySelector('#uploadImageSource').value = "";
    
        }

        if(modalId === "newAlbumButton") {
            document.querySelector('#newAlbumImageTitle').value = "";
            document.querySelector('#newAlbumImageSource').value = "";

            document.querySelector('#errorSourceAlbumModal').innerHTML = "";
            document.querySelector('#errorSourceAlbumModal').style.display = "none";
            document.querySelector('#imageVerifiedAlbumModal').style.display = "block";
        }
        
        
        uploadValidatedImage(url, title, modalId);
    }
}


function uploadValidatedImage(thisSource, thisTitle, modalId) {
    console.log("thisSource : " + thisSource);
    console.log("thisTitle : " + thisTitle);


    // checking privacy settings
    var privateCheckbox = document.querySelector('#privateCheckbox');
    if(privateCheckbox.checked){
        var priv = true;
    } else {
        var priv = false;
    }
    

    // checking new album or not
    // if yes, create new album
    if(modalId === "newAlbumButton") {
        var albumList = document.querySelector('#albumList');
        var newAlbumName = document.querySelector('#newAlbumName').value;
        console.log("newAlbumName: " + newAlbumName);
        let albumPill = document.createElement("a");
        let textAlbum = document.createTextNode(newAlbumName);
        let listPill = document.createElement("li");
        albumPill.appendChild(textAlbum);
        albumPill.setAttribute("href", "#");

        listPill.appendChild(albumPill);
        albumList.appendChild(listPill);

        listPill.setAttribute("role", "presentation");
        listPill.classList.add('tab');

        var allTabs = document.getElementsByClassName('tab');
        for(var k = 0; k < allTabs.length; k++) {
            allTabs[k].classList.remove('active');
        }
        
        listPill.classList.add('active');
        listPill.setAttribute("albumId", allTabs.length);
        listPill.addEventListener('click', setupListPill, false);

        document.querySelector('#newAlbumName').value = "";
    }


    // fetching current albumId
    var currentAlbumId;
    var allTabs = document.getElementsByClassName('tab');
    console.log(allTabs);
    for (var j = 0; j < allTabs.length; j++) {
        var ifActive = allTabs[j].classList.contains('active');
        if(ifActive){
            currentAlbumId = parseInt(allTabs[j].getAttribute('albumId'));
        }
    }
    
    // setting up the image Id
    var albumLength = 0;
    myPicturesArray.forEach(function(currentImage) {
        if(currentImage.albumId === currentAlbumId) {
            albumLength += 1;
        }
    });
    var thisImageId = currentAlbumId*100 + (albumLength + 1); 

    // constructing the image object
    imgObj = {
        "albumId": currentAlbumId,
            "id": thisImageId,
            "title": thisTitle,
            "url": thisSource,
            "thumbnailUrl": thisSource,
            "isPrivate": priv
    };
    
    console.log(imgObj);
    myPicturesArray.push(imgObj);
    
    displayNewImage(imgObj);
    if(modalId === "newAlbumButton") {
        showThisAlbum(allTabs.length);
    }
}

function displayNewImage(currentImage) {
    let image = document.createElement("img");
    let aTile = document.createElement("a");

    image.src = currentImage.thumbnailUrl;
    image.alt = currentImage.title;
    image.width = 275;

    aTile.appendChild(image);
    aTile.href = "/#" + currentImage.url;
    document.querySelector('#galleryDiv').appendChild(aTile);
    image.classList.add("imageThumbStyle");

    aTile.addEventListener("click", showImageModal, false);
    aTile.setAttribute("data-toggle", "modal");
    aTile.setAttribute("data-target", "#displayImageModal");

    if(currentImage.isPrivate === false) {
        var button = document.createElement("button");
        var btnText = document.createTextNode("delete");
        button.appendChild(btnText);
        button.classList.add("btn", "btn-warning");
        aTile.appendChild(button);

        button.setAttribute("data-toggle", "modal");
        button.setAttribute("deleteImageId", currentImage.id);
                
        button.addEventListener('click', function(event){
            $('#confirmDeleteModal').modal('show');
            console.log(event.target);
            var deleteImageId = parseInt(event.target.getAttribute("deleteImageId")); 
            var deleteImageConfirm = document.querySelector('#deleteImageConfirm');
            deleteImageConfirm.addEventListener("click", function(event) {
                deleteCurrentImage(deleteImageId);
            }, false); 
        });
    }
}


function deleteCurrentImage(delImageId) {
    console.log("about to delete image with id: " + delImageId);
    
    myPicturesArray.forEach(function(currentImage) {
        if(currentImage.id === delImageId) {
            var index = myPicturesArray.indexOf(currentImage);
            if (index > -1) {
                myPicturesArray.splice(index, 1);
                console.log("image deleted");

                $('#confirmDeleteModal').modal('hide');
                $('#displayImageModal').modal('hide');

                showThisAlbum(currentImage.albumId);
            } 
        }
    });
}
