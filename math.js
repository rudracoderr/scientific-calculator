const inputEl = document.querySelector("#input");

const insert = (value) => {
  inputEl.value += value;
};

const calculate = () => {
  const raw = inputEl.value;

  if (!raw) {
    return;
  }

  // Restrict expression to known calculator tokens before evaluation.
  const valid = /^[0-9+\-*/%^().a-z]*$/i.test(raw);
  if (!valid) {
    inputEl.value = "Error";
    return;
  }

  const expression = raw
    .replace(/pi/g, "Math.PI")
    .replace(/\bln\(/g, "Math.log(")
    .replace(/\blog\(/g, "Math.log10(")
    .replace(/\bsqrt\(/g, "Math.sqrt(")
    .replace(/\bsin\(/g, "Math.sin(")
    .replace(/\bcos\(/g, "Math.cos(")
    .replace(/\btan\(/g, "Math.tan(")
    .replace(/\^/g, "**");

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    inputEl.value = Number.isFinite(result) ? String(result) : "Error";
  } catch {
    inputEl.value = "Error";
  }
};

const backspace = () => {
  inputEl.value = inputEl.value.slice(0, -1);
};

const clearall = () => {
  inputEl.value = "";
};

const handleKeyboardInput = (event) => {
  const { key } = event;

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
    return;
  }

  if (key === "Backspace") {
    event.preventDefault();
    backspace();
    return;
  }

  if (key === "Escape") {
    event.preventDefault();
    clearall();
    return;
  }

  // Allow direct typing for calculator expressions and scientific function names.
  if (/^[0-9+\-*/%^().a-z]$/i.test(key)) {
    event.preventDefault();
    insert(key.toLowerCase());
  }
};

document.addEventListener("keydown", handleKeyboardInput);

