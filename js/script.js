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
  const statusCount = document.querySelectorAll(".status__content");

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

  const checkboxInputColor = document.getElementById("input-checkbox-color");
  const colorLouverContainer = document.querySelector(".color__louver__container");

  const previousBtn1 = document.getElementById("btn-form-previous-1");
  const continueBtn1 = document.getElementById("btn-form-continue-1");

  const previousBtn2 = document.getElementById("btn-form-previous-2");
  const continueBtn2 = document.getElementById("btn-form-continue-2");

  const previousBtn3 = document.getElementById("btn-form-previous-3");
  const continueBtn3 = document.getElementById("btn-form-continue-3");

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
    const colorSelect = e.target.matches(".color__select__content")
      ? e.target
      : e.target.closest(".color__select__content");

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

      if (checkboxInputColor.checked) {
        updateColorLouvers(color);
      }
    }
  }

  const updateColor = color => sides.forEach(side => side.style.backgroundColor = color);

  const updateColorLouvers = color => {
    louvers.forEach(louver => louver.style.backgroundColor = color);
  }

  const handleInputColor = e => {
    const color = e.target.value;
    const parent = e.target.closest(".form__article");
    if (parent.classList.contains("article__color__louvers")) {
      if (checkboxInputColor.checked) {
        updateColorLouvers(color);
        updateColor(color);
      } else {
        updateColorLouvers(color);
      }
    } else {
      if (checkboxInputColor.checked) {
        updateColorLouvers(color);
        updateColor(color);
      } else {
        updateColor(color);
      }
    }

    colorSelects.forEach(item => item.classList.remove("color--selected"));
    colorInput.forEach(input => {
      const customColor = input.closest(".color__select__content");
      customColor.classList.add("color--selected");
    });
  }

  const handleCheckboxColor = e => {
    louvers.forEach(louver => {
      louver.style.backgroundColor = e.target.checked ? sides[0].style.backgroundColor : "#000";
    });

    e.target.checked ? colorLouverContainer.classList.remove("element--show") : colorLouverContainer.classList.add("element--show");
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

  checkboxInputColor.addEventListener("change", e => handleCheckboxColor(e));

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

  previousBtn1.addEventListener("click", () => {
    previousBtn1.classList.remove("btn--selected");
    console.log("Removiendo clase");
  });

  continueBtn1.addEventListener("click", () => {
    main.classList.add("step-two");
    previousBtn1.classList.remove("btn--selected");
    statusCount[1].classList.add("status__content--active");
    statusCount[2].classList.remove("status__content--active");
    statusCount[3].classList.remove("status__content--active");
  })

  previousBtn2.addEventListener("click", () => {
    previous.classList.remove("btn--selected");
    main.className = "main";
    statusCount[1].classList.remove("status__content--active");
    statusCount[2].classList.remove("status__content--active");
    statusCount[3].classList.remove("status__content--active");
  });

  continueBtn2.addEventListener("click", () => {
    main.className = "main step-three";
    statusCount[1].classList.add("status__content--active");
    statusCount[2].classList.add("status__content--active");
    statusCount[3].classList.remove("status__content--active");
  });

  previousBtn3.addEventListener("click", () => {
    previous.classList.remove("btn--selected");
    main.className = "main step-two";
    statusCount[1].classList.add("status__content--active");
    statusCount[2].classList.remove("status__content--active");
    statusCount[3].classList.remove("status__content--active");
  });

  continueBtn3.addEventListener("click", () => {
    main.className = "main step-four";
    statusCount[1].classList.add("status__content--active");
    statusCount[2].classList.add("status__content--active");
    statusCount[3].classList.add("status__content--active");
  });

});