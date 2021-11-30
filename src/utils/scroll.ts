export const scroll = (el: Element) => {
  const top = el.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top, behavior: "smooth" });
};
