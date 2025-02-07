class boot extends stone {
    constructor() {
        super();
    }
}

customElements.define("special-boot", boot , { extends: 'img' })