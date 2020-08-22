const isMac = navigator.platform === 'MacIntel';

const KEY = {
    UP: 38,
    DOWN: 40,
};

document.querySelector("input").addEventListener("keydown", e => {
    if ([KEY.UP, KEY.DOWN].includes(e.keyCode)) {
        e.preventDefault();

        const currentValue = isNaN(parseFloat(e.target.value))
            ? parseFloat(e.target.getAttribute("min")) || 0
            : parseFloat(e.target.value);

        const direction = e.keyCode === KEY.UP ? 1 : -1;

        const modifier = (isMac ? e.metaKey : e.ctrlKey) ? 100 : e.shiftKey ? 10 : e.altKey ? 0.1 : 1;

        const decimals = Math.max(
            (currentValue.toString().split(".")[1] || "").length,
            e.altKey ? 1 : 0
        );

        const newValue = currentValue + direction * modifier;

        e.target.value = newValue.toFixed(decimals);
    }
});