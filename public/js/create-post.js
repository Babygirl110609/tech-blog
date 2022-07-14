 function createPostHandler(event) {
    event.preventDefault();

    window.location.replace('/dashboard/new')
}


document.querySelector('#create-new-post').addEventListener('click', createPostHandler);