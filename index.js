function processResponse(responseJson) {
    console.log(responseJson);

    $('.user-search-results').empty();

    // for each repo add the html to the response list

    for (let i=0; i<responseJson.length; i++) {
        $('.user-search-results').append(
            `<li><h2>${responseJson[i].name}</h2><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>`
        );
    }

}


function handleUserSearch() {

    $('form').submit(e => {
        e.preventDefault();
        fetch(`https://api.github.com/users/${$('#input-user').val()}/repos`)
            .then(response => { 
                if (response.ok)
                    return response.json();
                throw new Error(response.statusText);
            })
            .then(responseJson => processResponse(responseJson))
            .catch (error => {
                $('.user-search-results').empty();
                $('.user-search-results').append(`<h2>${error}</h2>`);
            });
    });
}

$(handleUserSearch);