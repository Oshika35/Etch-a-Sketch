function init() {
    const container = document.getElementById("gameContainer");

    function getUserInput() {
        const button = document.querySelector(".buttons__changeSize-container");
        button.addEventListener('click', () => {
            let answer = prompt("Specify a new size between 1 and 48");
            if (answer === null) {
                return;
            }
            else if (answer < 0 || answer > 48 || isNaN(answer)) {
                return alert("Please enter a number between 1 and 48");
            }
            resizeContainer(answer);
            createSquares(answer * answer);
        });
    }

    function resizeContainer(userSize) {
        container.setAttribute(
            "style", `grid-template-columns:repeat(${userSize}, 1fr); grid-template-rows: repeat(${userSize}, 1fr);`
        );
    }


    function createSquares(square = 256) {
        container.innerHTML = "";
        for (let i = 0; i < square; i++) {
            const randomColor = getRandomHexColor()
            const clear = document.querySelector(".clear");

            let current_brightness = 100
            let newDiv = document.createElement("div");
            newDiv.className = "square";

            newDiv.addEventListener("mouseover", () => {
                const brightness = current_brightness;
                current_brightness -= 10;
                newDiv.setAttribute("style", `background-color:${randomColor}; filter: brightness(${brightness}%);`);
            });

            clear.addEventListener('click', () => {
                    newDiv.removeAttribute("style");
                    current_brightness = 100;
            });

            container.appendChild(newDiv);
        }
    }

    function getRandomHexColor() {
        let initialNumber = Math.round(0xffffff * Math.random()).toString(16);
        let substringNumber = (6-initialNumber.length);
        let numberToSubstract = "000000";
        let finalNumber = numberToSubstract.substring(0,substringNumber);
        let randomHex= "#" + finalNumber + initialNumber;
        return randomHex;
    }

    getUserInput();
    createSquares();
}
init();