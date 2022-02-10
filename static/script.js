// noinspection JSUnfilteredForInLoop,JSDeprecatedSymbols

const base_url = "https://github.com/MrAlex6204/Books/raw/master/"
function show_books() {
    const list_of_books = document.getElementById("list_of_books")
    $.get("/books", function (data){
        const json_data = JSON.parse(data)['data']
        for (let jsonDataKey in json_data) {

            console.log(json_data[jsonDataKey])

            let book_name_tag = document.createElement('li')

            book_name_tag.innerHTML = json_data[jsonDataKey].toString()

            book_name_tag.setAttribute("class", "list-group-item")

            let anchor_tag_download = document.createElement("a")

            let download_button = document.createElement("button")

            let anchor_tag_read = document.createElement("a")

            let read_button = document.createElement("button")

            read_button.innerText  = "Read it"

            read_button.setAttribute("class", 'btn-primary')
            read_button.setAttribute("style", 'float: right; margin-right: 20px')
            read_button.setAttribute("name", 'read')

            anchor_tag_read.append(read_button)

            download_button.setAttribute("class", 'btn-primary')

            anchor_tag_download.setAttribute("href", base_url + json_data[jsonDataKey] + '.pdf')

            download_button.setAttribute("style", "float: right")

            download_button.innerHTML = "Download it"

            anchor_tag_download.append(download_button)

            book_name_tag.append(anchor_tag_download)
            book_name_tag.append(anchor_tag_read)
            book_name_tag.style.wordWrap = "break-word"

            list_of_books.append(book_name_tag)


        }

    });



}


// noinspection JSDeprecatedSymbols
document.getElementById("list_of_books").addEventListener("click", function(){
    console.clear()
    console.log("click")
    console.log(event.target.tagName)
    console.log(event.target.name)
    // noinspection JSDeprecatedSymbols
    if (event.target.tagName === "BUTTON" && event.target.name === "read"){
        const full_file_name = event.target.parentNode.parentNode.innerText.split("\n")[0] + '.pdf'
        console.log(full_file_name)
        document.getElementsByName('book')[0].value = full_file_name
        document.getElementById('submit').click()


    }

});








