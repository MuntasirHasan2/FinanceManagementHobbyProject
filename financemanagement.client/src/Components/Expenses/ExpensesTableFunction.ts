export function showCategoryType() {
    const type = document.getElementById("category_type");
    if (type) {

        if (type.classList.contains("show-dropdown")) {
            type.classList.remove("show-dropdown");
        } else {

            type.classList.add("show-dropdown");
        }
    }
}

export function showType() {
    const type = document.getElementById("type");
    if (type) {

        if (type.classList.contains("show-dropdown")) {
            type.classList.remove("show-dropdown");
        } else {

            type.classList.add("show-dropdown");
        }
    }
}

export function showCategoryTypeMobile() {
    const type = document.getElementById("category_type_mobile");
    if (type) {

        if (type.classList.contains("show-dropdown")) {
            type.classList.remove("show-dropdown");
        } else {

            type.classList.add("show-dropdown");
        }
    }
}

export function showTypeMobile() {
    const type = document.getElementById("type-mobile");
    if (type) {

        if (type.classList.contains("show-dropdown")) {
            type.classList.remove("show-dropdown");
        } else {

            type.classList.add("show-dropdown");
        }
    }
}
