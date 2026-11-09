export {};

const list = document.querySelector<HTMLUListElement>("#items");

if (list !== null) {
  list.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLButtonElement && target.classList.contains("remove")) {
      const row = target.closest<HTMLLIElement>("li");
      row?.remove();
    }
  });
}
