/**
 * Minimal free SplitText polyfill for basic char / line splitting.
 * Not as advanced as GSAP Club SplitText, but works for most text animations.
 */
export default class SplitText {
  constructor(target, vars = {}) {
    this.elements = typeof target === "string" ? document.querySelectorAll(target) : (target.length ? target : [target]);
    this.chars = [];
    this.lines = [];
    this.words = [];
    this.vars = vars;
    this.type = (vars.type || "chars").split(",").map(t => t.trim());

    this.elements.forEach((el) => {
      if (!el) return;
      const originalHTML = el.innerHTML;
      const text = el.textContent || "";

      if (this.type.includes("chars") || this.type.includes("words")) {
        // Split into words first
        const words = text.split(/(\s+)/).filter(Boolean);
        el.innerHTML = "";
        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            el.appendChild(document.createTextNode(word));
            return;
          }
          const wordSpan = document.createElement("span");
          wordSpan.className = vars.wordsClass || "word";
          wordSpan.style.display = "inline-block";
          this.words.push(wordSpan);

          if (this.type.includes("chars")) {
            [...word].forEach((char) => {
              const charSpan = document.createElement("span");
              charSpan.className = vars.charsClass || "char";
              charSpan.style.display = "inline-block";
              charSpan.textContent = char;
              wordSpan.appendChild(charSpan);
              this.chars.push(charSpan);
            });
          } else {
            wordSpan.textContent = word;
          }
          el.appendChild(wordSpan);
        });
      }

      if (this.type.includes("lines")) {
        // Simple line split using getClientRects (approximate)
        // For better results we keep the structure and collect line-like groups
        // This is a basic approximation
        const lineSpans = el.querySelectorAll(`.${vars.wordsClass || "word"}`);
        if (lineSpans.length) {
          this.lines = Array.from(lineSpans);
        } else {
          // fallback: wrap whole content
          const line = document.createElement("span");
          line.className = vars.linesClass || "line";
          line.style.display = "block";
          line.innerHTML = el.innerHTML;
          el.innerHTML = "";
          el.appendChild(line);
          this.lines.push(line);
        }
      }
    });
  }

  static create(target, vars) {
    return new SplitText(target, vars);
  }

  revert() {
    // Basic revert not fully implemented for simplicity
  }
}
