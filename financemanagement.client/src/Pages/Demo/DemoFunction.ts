export function setIncomeFieldEditable(): void {
    const income_element_input: HTMLElement = document.getElementById("inccomeId")!;
    if (income_element_input) {
        if (income_element_input.getAttribute("disabled")) {
            income_element_input.removeAttribute("disabled");
            income_element_input.classList.remove("input-active");

        } else {

            income_element_input.setAttribute("disabled", "true");
            income_element_input.classList.add("input-active");
        }
    }
}