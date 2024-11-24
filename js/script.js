console.log("Corriendo en el puerto 5500");

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const main = document.querySelector(".main");
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

  const colorSelects = document.querySelectorAll(".color__select__content");
  const inputColor = document.getElementById("color-picker");
  const colorInput = document.querySelectorAll(".input__color");
  const louvers = document.querySelectorAll(".louver__color");

  const btnFormPrevious = document.querySelectorAll(".btn-form-previous");
  const btnFormContinue = document.querySelectorAll(".btn-form-continue");

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

  const handleColorSelect = e => {
    const parent = e.target.closest(".form__article");
    console.log("Parent", parent);
    const colorSelect = e.target.matches(".color__select__content")
      ? e.target
      : e.target.closest(".color__select__content");

    console.log("ColorSelect", colorSelect);

    if (!colorSelect) return;

    // Remover selecciones
    colorSelects.forEach(item => item.classList.remove("color--selected"));

    // Seleccionar
    colorSelect.classList.add("color--selected");

    // Obtener color
    const color = colorSelect.dataset.color;

    if (color) {
      if (!parent.classList.contains("article__color__louvers")) {
        updateColor(color);
      } else {
        updateColorLouvers(color);
      }
    }
  }

  const updateColor = color => sides.forEach(side => side.style.backgroundColor = color);

  const updateColorLouvers = color => louvers.forEach(louver => louver.style.backgroundColor = color);

  const handleInputColor = e => {
    const color = e.target.value;
    const parent = e.target.closest(".form__article");
    if (parent.classList.contains("article__color__louvers")) {
      updateColorLouvers(color);
    } else {
      updateColor(color);
    }

    colorSelects.forEach(item => item.classList.remove("color--selected"));
    colorInput.forEach(input => {
      const customColor = input.closest(".color__select__content");
      customColor.classList.add("color--selected");
    });
  }


  // Eventos
  btnsMeasure.forEach(btn => btn.addEventListener("click", e => handleMeasureBtn(e)));

  formInputs.forEach(input => {
    input.addEventListener("focus", e => handleInputFocus(e.target, true));
    input.addEventListener("blur", e => handleInputFocus(e.target, false));
  });

  btnsGroupBg.forEach(group => group.addEventListener("click", e => handleGroupBtn(e.target)));

  inputCheckboxContact.addEventListener("change", e => handleCheckboxChange(e.target.checked));

  attachedMeasures.forEach(measure => measure.addEventListener("click", e => toggleCheckBox(e.target.closest(".attached__measure"))));

  colorSelects.forEach(select => select.addEventListener("click", e => handleColorSelect(e)));

  colorInput.forEach(input => input.addEventListener("input", e => handleInputColor(e)));

  btnFormPrevious.forEach(btn => {
    btn.addEventListener("click", () => {
      main.classList.remove("step-two");
    });
  });

  btnFormContinue.forEach(btn => {
    btn.addEventListener("click", () => {
      main.classList.add("step-two");
    });
  });

});