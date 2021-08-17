window.addEventListener("load", function ()
{
    console.log("Context Menu setup starting...")
    const contextMenu = document.getElementById("context-menu");
    const scope = document.querySelector("body");

    const normalizePozition = (mouseX, mouseY) => {
        let { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect();

        scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
        scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;

        const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth;
        const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight;

        let normalizedX = mouseX;
        let normalizedY = mouseY;

        if (outOfBoundsOnX)
            normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
        if (outOfBoundsOnY)
            normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;

        return { normalizedX, normalizedY };
    };

    scope.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        var id = localStorage.getItem("id")
        if (id == -1 || id == null)
            return

        const { clientX: mouseX, clientY: mouseY } = event;
        const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

        contextMenu.classList.remove("visible");
        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        setTimeout(() => contextMenu.classList.add("visible"));
    });

    scope.addEventListener("click", (e) => {
        if (e.target.offsetParent != contextMenu)
            contextMenu.classList.remove("visible");
    });
    console.log("Context Menu setup finished!")
})