document.addEventListener("DOMContentLoaded", loadDOM);

function loadDOM() {
    displaySearch();
}

async function displaySearch() {
    document.getElementById('btn').addEventListener("click", async () => {
        const input = document.getElementById("input").value;
        const sanitizedInput = Sanitize(input);

        const fData = new FormData();
        fData.append('heroname', sanitizedInput);

        const hed = new Headers();

        const reqst = new Request("superheroes.php", {
            method: 'POST',
            headers: hed,
            mode: 'same-origin',
            body: fData
        });

        try {
            const response = await fetch(reqst);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            alert(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
}

function Sanitize(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, " ");
    return str.trim();
}
