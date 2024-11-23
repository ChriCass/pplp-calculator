console.log("Corriendo en el puerto 5500");

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const btnsFormMeasure = document.querySelectorAll(".btn__measure"); 
  const inputUnits = document.querySelectorAll(".input__unit");
  const formInputs = document.querySelectorAll(".form__input");
  const sides = document.querySelectorAll(".side");

  // Eventos
  btnsFormMeasure.forEach((btn) => {
    // Remueve la clase "btn--selected" de todos los botones y la asigna al clickeado
    btn.addEventListener("click", () => {
      btnsFormMeasure.forEach((btn) => {
        btn.classList.remove("btn--selected");
      });
      btn.classList.add("btn--selected");

      inputUnits.forEach((input) => {
        input.textContent = (btn.textContent).toLowerCase();
      });
    });
  });

  // Agregar clase bg--active al focus del input actual
  formInputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      const dataId = e.target.dataset.mesurance;

      sides.forEach((side) => {
        console.log("Data del input: ", dataId);
        if (side.classList.contains(`side__${dataId}--active`)) {
          return;
        }
        if (side.classList.contains(`side__${dataId}`)) {
          side.classList.add(`side__${dataId}--active`);
        }
        console.log("Agregando estilos...");
      });

      const element = e.target.parentElement.parentElement.parentElement.parentElement;
      element.classList.add("bg--active");
    });
    input.addEventListener("blur", e => {
      const dataId = e.target.dataset.mesurance;

      sides.forEach((side) => {
        if (side.classList.contains(`side__${dataId}--active`)) {
          side.classList.remove(`side__${dataId}--active`);
        }
        console.log("Removiendo estilos...");
      });

      const element = e.target.parentElement.parentElement.parentElement.parentElement;
      element.classList.remove("bg--active");
    })
  });

});