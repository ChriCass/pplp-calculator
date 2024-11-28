console.log("Corriendo en el puerto 5500");

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const sectionCalculatorForm = document.querySelector(".section__calculator__content");
  const inputRadioBtns = document.querySelectorAll(".input__radio__btn"); 
  const inputUnits = document.querySelectorAll(".input__unit");
  const formInputs = document.querySelectorAll(".input__unit__text");
  const sides = document.querySelectorAll(".side__color");
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
  const colorInput = document.querySelectorAll(".input__color");
  const louvers = document.querySelectorAll(".louver__color");

  const customColor = document.querySelectorAll("color__picker");

  const btnsLabelTypeMaterial = document.querySelectorAll(".label__action__btn");

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

  const previousBtn4 = document.getElementById("btn-form-previous-4");
  const continueBtn4 = document.getElementById("btn-form-continue-4");

  const chooseHeaderAccesory = document.querySelectorAll(".choose__header");

  const cardsMaterial = document.querySelectorAll(".accesory__card__material__element");

  const cardsMaterialColor = document.querySelectorAll(".accesory__card__color__content");

  const form = document.querySelector(".form");

  // Helper para togglear clases
  const toggleClass = (element, className, condition) => {
    element.classList.toggle(className, condition);
  };

  // Manejador de eventos
  const handleRadioBtns = e => {
    const btnsGroup = e.target.closest(".form__btns");
    if (!btnsGroup) return;

    const labels = btnsGroup.querySelectorAll(".action__btn");
    if (!labels) return;

    labels.forEach(label => label.classList.remove("action__btn--selected"));

    const asociatedLabel = btnsGroup.querySelector(`label[for="${e.target.id}"]`);
    if (asociatedLabel) asociatedLabel.classList.add("action__btn--selected");
  }

  const handleMeasureBtn = e => {
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
    const showAttached = target.dataset.election === "attached";
    toggleClass(electionAttached, "element--show", showAttached);
  };

  const handleCheckboxChange = checked => {
    toggleClass(electionContact, "element--show", checked);
    toggleClass(electionPergola, "element--show", !checked);
    toggleClass(btnsFooter, "element--show", !checked);

    if (!checked && btnAttached.classList.contains("action__btn--selected")) {
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
    const parentColorPergola = e.target.closest(".article__color__base");
    if (parentColorPergola) {
      const pergolasColor = parentColorPergola.querySelectorAll(".label__color__pergola");
      const radioColorPergolas = parentColorPergola.querySelectorAll(".input__radio__color");

      radioColorPergolas.forEach(radio => radio.checked = false);

      pergolasColor.forEach(label => label.classList.remove("color--selected"));

      const colorSelected = e.target.matches(".label__color__pergola")
        ? e.target
        : e.target.closest(".label__color__pergola");
      

      const inputSelected = colorSelected.nextElementSibling;
      inputSelected.checked = true;

      colorSelected.classList.add("color--selected");

      const colorData = colorSelected.dataset.color;

      if (!colorData) return;

      updateColor(colorData);

      if (checkboxInputColor.checked) {
        updateColorLouvers(colorData);
      }
    } else {
      const parentColorLouver = e.target.closest(".article__color__louvers");
      if (parentColorLouver) {
        const louversColor = parentColorLouver.querySelectorAll(".label__color__louver");
        const radioColorLouvers = parentColorLouver.querySelectorAll(".input__radio__color");

        radioColorLouvers.forEach(radio => radio.checked = false);
        louversColor.forEach(label => label.classList.remove("color--selected"));

        const colorSelectedLouver = e.target.matches(".label__color__louver")
          ? e.target
          : e.target.closest(".label__color__louver");

        const imputSelectedLouver = colorSelectedLouver.nextElementSibling;
        imputSelectedLouver.checked = true;

        colorSelectedLouver.classList.add("color--selected");

        const colorData = colorSelectedLouver.dataset.color;

        if (!colorData) return;

        updateColorLouvers(colorData);
      }
    }

  }

  const updateColor = color => sides.forEach(side => side.style.backgroundColor = color);

  const updateColorLouvers = color => louvers.forEach(louver => {
    louver.style.backgroundColor = color;
    const parentLouver = louver.closest(".article__color__louvers");

    if (!parentLouver) return;

    if (checkboxInputColor.checked) {
      parentLouver.querySelectorAll(".input__radio__color").forEach(radio => radio.checked = false);
    }
  });
  
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

  const handleAccesoryBtn = e => {
    const containerAccesory = e.target.closest(".choose__accesory__options__content");
    if (!containerAccesory) return;

    const card = e.target.closest(".accesory__card__material__element") ? e.target.closest(".accesory__card__material__element") : e.target;

    const material = card.dataset.material;

    containerAccesory.querySelectorAll(".accesory__card__material__element").forEach(element => element.classList.remove("accesory__element--selected"));
    card.classList.add("accesory__element--selected");
    
    const groups = containerAccesory.querySelectorAll(".group");

    groups.forEach(group => group.classList.toggle("element--show", group.dataset.group === material));

    const materialContainer = containerAccesory.querySelector(".accesory__card__content");
    const typeMaterialContainer = containerAccesory.querySelector(".accesory__options");
    const cardColors = typeMaterialContainer.querySelectorAll(".accesory__card__color__content"); // Cards de colores
    const btnGlass = typeMaterialContainer.querySelector(".btn__glass"); // Botones de tipo de material Glass
    const btnAluminium = typeMaterialContainer.querySelector(".btn__sliding"); // Botones de tipo de material Aluminio

    const inputRadioGlass = btnGlass.nextElementSibling;
    inputRadioGlass.checked = false;

    const inputRadioAluminium = btnAluminium.nextElementSibling;
    inputRadioAluminium.checked = false;

    const inputRadioColorCard = cardColors[0].nextElementSibling;
    inputRadioColorCard.checked = false;

    console.log("materialContainer: ", materialContainer);
    console.log("typeMaterialContainer: ", typeMaterialContainer);

    if (typeMaterialContainer.classList.contains("accesory__options__1")) {
      if (materialContainer.children[1].checked) {
        inputRadioColorCard.checked = true;
        console.log("inputRadioColorCard: ", inputRadioColorCard.checked);
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[3].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = true;
        console.log("inputRadioGlass: ", inputRadioGlass.checked);
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[5].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = true;
        console.log("inputRadioAluminium: ", inputRadioAluminium.checked);
      }
    } else if (typeMaterialContainer.classList.contains("accesory__options__2")) {
      if (materialContainer.children[1].checked) {
        inputRadioColorCard.checked = true;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[3].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = true;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[5].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = true;
      }
    } else if (typeMaterialContainer.classList.contains("accesory__options__3")) {
      if (materialContainer.children[1].checked) {
        inputRadioColorCard.checked = true;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[3].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = true;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[5].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = true;
      }
    } else if (typeMaterialContainer.classList.contains("accesory__options__4")) {
      if (materialContainer.children[1].checked) {
        inputRadioColorCard.checked = true;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[3].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = true;
        inputRadioAluminium.checked = false;
      } else if (materialContainer.children[5].checked) {
        inputRadioColorCard.checked = false;
        inputRadioGlass.checked = false;
        inputRadioAluminium.checked = true;
      }
    }

    console.log("materialContainer.children[1].checked: ", materialContainer.children[1].checked);
    console.log("materialContainer.children[3].checked: ", materialContainer.children[3].checked);
    console.log("materialContainer.children[5].checked: ", materialContainer.children[5].checked);

  }

  const handleColorAccesoryBtn = e => {
    const parentColor = e.target.closest(".accesory__card__container");
    if (!parentColor) return;

    const cards = parentColor.querySelectorAll(".accesory__card__color__content");

    cards.forEach(card => card.classList.remove("accesory__element--selected"));

    const card = e.target.matches(".accesory__card__color__content")
      ? e.target
      : e.target.closest(".accesory__card__color__content");

    if (!card) return;

    card.classList.add("accesory__element--selected");
  }

  const handeBtnsTypeMaterial = e => {
    const parentBtns = e.target.closest(".accesory__type__btns");
    if (!parentBtns) return;

    const btns = parentBtns.querySelectorAll(".label__action__btn");
    if (!btns) return;

    btns.forEach(btn => btn.classList.remove("action__btn--selected"));

    const btn = e.target.matches(".label__action__btn")
      ? e.target
      : e.target.closest(".label__action__btn");

    if (!btn) return;

    btn.classList.add("action__btn--selected");
  }

  const showSectionForm = step => {
    sectionCalculatorForm.className = `section__calculator__content step-${step}`;

    statusCount.forEach((stat, index) => {
      index < step ? stat.classList.add("status__content--active") : stat.classList.remove("status__content--active");
    });

    handleButtons(step);
  }

  const handleButtons = step => {
    step === 1 ? previousBtn1.disabled = true : previousBtn1.disabled = false;
  }

  // Eventos
  btnsMeasure.forEach(btn => btn.addEventListener("click", e => handleMeasureBtn(e)));

  inputRadioBtns.forEach(input => input.addEventListener("change", e => handleRadioBtns(e)));

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

  customColor.forEach(color => {
    const parent = color.closest(".color__select__container");

    parent.querySelectorAll(".input__radio__color").forEach(radio => radio.checked = false);

    const parentRadio = color.closest(".custom__color");
    parentRadio.querySelector("#input-radio-color-louver-custom").checked = true;
  })

  btnFormPrevious.forEach(btn => {
    btn.addEventListener("click", () => {
      sectionCalculatorForm.classList.remove("step-two");
    });
  });

  btnFormContinue.forEach(btn => {
    btn.addEventListener("click", () => {
      sectionCalculatorForm.classList.add("step-two");
    });
  });

  previousBtn1.addEventListener("click", () => showSectionForm(1));

  continueBtn1.addEventListener("click", () => showSectionForm(2));

  previousBtn2.addEventListener("click", () => showSectionForm(1));

  continueBtn2.addEventListener("click", () => showSectionForm(3));

  previousBtn3.addEventListener("click", () => showSectionForm(2));

  continueBtn3.addEventListener("click", () => showSectionForm(4));

  previousBtn4.addEventListener("click", () => showSectionForm(3));

  continueBtn4.addEventListener("click", () => showSectionForm(5));

  chooseHeaderAccesory.forEach(header => header.addEventListener("click", () => header.classList.toggle("choose__header--active")));

  cardsMaterial.forEach(card => card.addEventListener("click", e => handleAccesoryBtn(e)));

  cardsMaterialColor.forEach(card => card.addEventListener("click", e => handleColorAccesoryBtn(e)));

  // Obtener los datos del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    console.log(data);
  })

});