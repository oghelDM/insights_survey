export class ImageDM extends HTMLElement {
  constructor(id: string, style: any) {
    console.log("Image constructor");
    super();

    this.setAttribute("id", id);

    const actualStyle = {
      display: "block",
      position: "absolute",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      width: "50%",
      height: "auto",
      left: null,
      top: null,
      right: null,
      bottom: null,
      borderRadius: "0px",
      opacity: 1,
      scale: 1,
      rotate: 0,
      backgroundColor: null,
      aspectRatio: "auto",

      ...style,
      backgroundImage: `url("${style.url}")` || null
    };

    // @todo duplicated across multiple files
    for (const [key, value] of Object.entries(actualStyle)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.style[key] = value;
    }
  }
}

// declare the new web component to allow constructor instanciation
customElements.define("dm-image", ImageDM);
