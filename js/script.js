console.log("Corriendo en el puerto 5500");

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const btnsFormMeasure = document.querySelectorAll(".btn__measure"); 
  const inputUnits = document.querySelectorAll(".input__unit");
  const formInputs = document.querySelectorAll(".form__input");
  const sides = document.querySelectorAll(".side");
  const btnsGroup = document.querySelectorAll(".btn__bg");
  const btnsGroupBg = document.querySelectorAll(".btns__group--bg");
  const btnsMeasure = document.querySelectorAll(".btn__measure");
  const btnMeasureSelected = document.querySelector(".btn--selected");

  const inputCheckboxContact = document.getElementById("input-checkbox-form-contact");
  
  const electionContact = document.querySelector(".election__contact");
  const electionPergola = document.querySelector(".election__pergola");
  const btnsFooter = document.querySelector(".form__btns__footer");

  const attachedMeasures = document.querySelectorAll(".attached__measure__content");

  const electionAttached = document.querySelector(".election__attached");
  const btnAttached = document.querySelector('.btn__election[data-election="attached"]');

  /* // Eventos
  btnsFormMeasure.forEach((btn) => {
    // Remueve la clase "btn--selected" de todos los botones y la asigna al clickeado
    btn.addEventListener("click", () => {
      btnsMeasure.forEach(btn => btn.classList.remove("btn--selected"));
      btnMeasureSelected?.classList.remove("btn--selected");
      btn.classList.add("btn--selected");

      const unitText = btn.textContent.toLowerCase();

      inputUnits.forEach(input => input.textContent = unitText);
    });
  });

  // Agregar clase bg--active al focus del input actual
  formInputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      const dataId = e.target.dataset.mesurance;

      sides.forEach((side) => {
        if (side.classList.contains(`side__${dataId}--active`)) {
          return;
        }
        if (side.classList.contains(`side__${dataId}`)) {
          side.classList.add(`side__${dataId}--active`);
        }
      });

      const element = input.closest(".input__bg");
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

      const element = input.closest(".input__bg");
      element.classList.remove("bg--active");
    })
  });

  // Change bg-button
  btnsGroup.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const btnGroup = e.target.closest(".btns__group--bg");
      const currentBtn = btnGroup.querySelectorAll(".btn__bg");
      currentBtn.forEach(btn => btn.classList.remove("btn--selected"));
      if (e.target.matches(".btn__bg")) {
        e.target.classList.add("btn--selected");
        if (e.target.dataset.election === "attached") {
          if (!electionAttached.classList.contains("element--show")) {
            electionAttached.classList.add("element--show");
          }
        } else {
          electionAttached.classList.remove("element--show");
        }
      } else if (e.target.matches(".text__clean")){
        e.target.parentElement.classList.add("btn--selected");
        if (e.target.parentElement.dataset.election === "attached") {
          if (!electionAttached.classList.contains("element--show")) {
            electionAttached.classList.add("element--show");
          }
        } else {
          electionAttached.classList.remove("element--show");
        }
      }
    });
  });

  // Change checked
  inputCheckboxContact.addEventListener("change", (e) => {
    if (e.target.checked) {
      electionContact.classList.add("element--show");
      electionPergola.classList.remove("element--show");
      btnsFooter.classList.remove("element--show");
      electionAttached.classList.remove("element--show");
    } else {
      electionContact.classList.remove("element--show");
      electionPergola.classList.add("element--show");
      btnsFooter.classList.add("element--show");
      if (btnAttached.classList.contains("btn--selected")) {
        electionAttached.classList.add("element--show");
      }
    }
  });

  // Attached
  attachedMeasures.forEach((measure) => {
    measure.addEventListener("click", (e) => {
      const checkBoxContainer = e.target.closest(".attached__measure");
      const checkBoxMeasure = checkBoxContainer.querySelector(".input__checkbox__attached__measure");
      checkBoxMeasure.checked = !checkBoxMeasure.checked;
    });
  }); */

  // Helper para togglear clases
  const toggleClass = (element, className, condition) => {
    element.classList.toggle(className, condition);
  };

  // Manejador de eventos
  const handleMeasureBtn = e => {
    const btnsGroup = e.target.closest(".form__btns");
    const currentBtn = btnsGroup.querySelectorAll(".btn__measure");
    currentBtn.forEach(btn => btn.classList.remove("btn--selected"));
    if (e.target.matches(".btn__measure")) {
      e.target.classList.add("btn--selected");
    }

    const unitText = e.target.textContent.toLowerCase();
    inputUnits.forEach(input => input.textContent = unitText);
  };

  const handleInputFocus = (input, focus) => {
    const dataId = input.dataset.mesurance;

    sides.forEach(side => toggleClass(side, `side__${dataId}--active`, focus && side.classList.contains(`side__${dataId}`)));

    const bgElement = input.closest(".input__bg");
    toggleClass(bgElement, "bg--active", focus);
  };

  const handleGroupBtn = target => {
    const btnGroup = target.closest(".btns__group--bg");
    btnGroup.querySelectorAll(".btn__bg").forEach(btn => btn.classList.remove("btn--selected"));

    if (target.matches(".btn__bg, .text__clean")) {
      const btn = target.matches(".btn__bg") ? target : target.parentElement;
      btn.classList.add("btn--selected");
      const showAttached = btn.dataset.election === "attached";
      toggleClass(electionAttached, "element--show", showAttached);
    }
  };

  const handleCheckboxChange = checked => {
    toggleClass(electionContact, "element--show", checked);
    toggleClass(electionPergola, "element--show", !checked);
    toggleClass(btnsFooter, "element--show", !checked);

    if (!checked && btnAttached.classList.contains("btn--selected")) {
      electionAttached.classList.add("element--show");
    } else {
      electionAttached.classList.remove("element--show");
    }
  };

  const toggleCheckBox = container => {
    const checkbox = container.querySelector(".input__checkbox__attached__measure");
    checkbox.checked = !checkbox.checked;
  };

  // Eventos
  btnsMeasure.forEach(btn => btn.addEventListener("click", e => handleMeasureBtn(e)));

  formInputs.forEach(input => {
    input.addEventListener("focus", e => handleInputFocus(e.target, true));
    input.addEventListener("blur", e => handleInputFocus(e.target, false));
  });

  btnsGroupBg.forEach(group => group.addEventListener("click", e => handleGroupBtn(e.target)));

  inputCheckboxContact.addEventListener("change", e => handleCheckboxChange(e.target.checked));

  attachedMeasures.forEach(measure => measure.addEventListener("click", e => toggleCheckBox(e.target.closest(".attached__measure"))));

});