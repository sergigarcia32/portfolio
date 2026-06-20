document.addEventListener("DOMContentLoaded", function () {
    const cards = Array.from(
        document.querySelectorAll("#technology-cards-row > .col-sm-6"),
    );
    const paginationContainer = document.getElementById(
        "technology-pagination",
    );
    const modalElement = document.getElementById("techDescriptionModal");
    const modalTitle = modalElement?.querySelector(".modal-title");
    const modalBody = modalElement?.querySelector(".modal-body");
    const cardsPerPage = 6;
    let currentPage = 1;

    if (
        !cards.length ||
        !paginationContainer ||
        !modalElement ||
        !modalTitle ||
        !modalBody
    ) {
        return;
    }

    const descriptionModal = new bootstrap.Modal(modalElement);
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    function createModalButton(card) {
        const cardBody = card.querySelector(".card-body");
        const descriptionParagraph = cardBody?.querySelector(
            "p.text-muted.small.mb-0",
        );
        if (!cardBody || !descriptionParagraph) {
            return;
        }

        descriptionParagraph.classList.add("d-none");

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-sm btn-outline-dark mt-3 align-self-start";
        button.textContent = "Ver descripción";
        button.addEventListener("click", function () {
            const title =
                cardBody.querySelector("h5")?.textContent.trim() ||
                "Descripción";
            modalTitle.textContent = title;
            modalBody.textContent = descriptionParagraph.textContent.trim();
            descriptionModal.show();
        });

        cardBody.insertBefore(button, descriptionParagraph);
    }

    function initializeCards() {
        cards.forEach(createModalButton);
    }

    function showPage(page) {
        currentPage = Math.min(Math.max(page, 1), totalPages);

        const start = (currentPage - 1) * cardsPerPage;
        const end = currentPage * cardsPerPage;

        cards.forEach((card, index) => {
            card.style.display = index >= start && index < end ? "" : "none";
        });

        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";

        const prevButton = document.createElement("button");
        prevButton.type = "button";
        prevButton.className = "btn btn-outline-primary btn-sm";
        prevButton.textContent = "Anterior";
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener("click", () => showPage(currentPage - 1));

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "btn btn-outline-primary btn-sm";
        nextButton.textContent = "Siguiente";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", () => showPage(currentPage + 1));

        const pageInfo = document.createElement("span");
        pageInfo.className = "text-muted small";
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageInfo);
        paginationContainer.appendChild(nextButton);
    }

    initializeCards();
    showPage(1);
});
