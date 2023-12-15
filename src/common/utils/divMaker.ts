export const createDiv = (id: string, style: Record<string, string | number>): HTMLElement => {
  console.log("createDiv: ", id);
  const div = document.createElement("div");
  div.id = id;
  // @todo duplicated across multiple files
  for (const [key, value] of Object.entries(style)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    div.style[key] = value;
  }

  return div;
};
