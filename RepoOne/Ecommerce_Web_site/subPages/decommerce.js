

function openPage(select) {
    let url = select.value;
    if (url) {
        window.open(url, "_parent");
    }
}