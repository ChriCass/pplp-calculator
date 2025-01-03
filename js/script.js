console.log("Corriendo en el puerto 5500");

document.addEventListener("DOMContentLoaded", () => {
  // DOM
  const stepUno = document.querySelector(".step-1");
  const sectionCalculatorForm = document.querySelector(".section__calculator__content");
  const inputRadioBtns = document.querySelectorAll(".input__radio__btn"); 
  const inputUnits = document.querySelectorAll(".input__unit");
  const formInputs = document.querySelectorAll(".input__unit__text");
  const sides = document.querySelectorAll(".side__color");
  const btnsGroupBg = document.querySelectorAll(".btns__group--bg");
  const btnsMeasure = document.querySelectorAll(".btn__measure");
  const statusCount = document.querySelectorAll(".status__content");

  const alertMessage = document.getElementById("alert-message");

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

  const tableAccesory = document.querySelector(".scene__table__accesory");

  const customColor = document.querySelectorAll(".color__picker");

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

  const previousBtn5 = document.getElementById("btn-form-previous-5");

  const chooseHeaderAccesory = document.querySelectorAll(".choose__header");

  const cardsMaterial = document.querySelectorAll(".accesory__card__material__element");

  const cardsMaterialColor = document.querySelectorAll(".accesory__card__color__content");

  const form = document.querySelector(".form");

  // Confirmación de envío de formulario
  const params = new URLSearchParams(window.location.search);
  if (params.get("success") === "true") {
    const confirmation = document.createElement("div");
    confirmation.className = "confirmation__container confirmation--show"
    confirmation.innerHTML = `
      <div class="confirmation__title">
        <h3>Thank you for your submission!</h3>
      </div>
    `;
    stepUno.appendChild(confirmation);

    const confirmationContainer = document.querySelector(".confirmation__container");

    setTimeout(() => confirmationContainer.classList.remove("confirmation--show"), 2500);
  }

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
    // console.log("asociatedLabel", asociatedLabel);
    if (asociatedLabel) asociatedLabel.classList.add("action__btn--selected");
  }

  const handleMeasureBtn = e => {
    const unitText = e.target.textContent.toLowerCase();
    const attachedMeasure = document.querySelectorAll(".attached__measure--text");
    inputUnits.forEach(input => input.textContent = unitText);
    attachedMeasure.forEach(measure => measure.textContent = ` ${unitText}`);
  };

  const handleInputFocus = (input, focus) => {
    const span = input.nextElementSibling; // Span unit
    span.style.opacity = 0;
    const dataId = input.dataset.mesurance;

    const articleContainer = input.closest(".form__article");

    const sidesArticle = articleContainer.querySelectorAll(".side");

    sidesArticle.forEach(side => toggleClass(side, `side__${dataId}--active`, focus && side.classList.contains(`side__${dataId}`)));

    const bgElement = input.closest(".input__bg");
    toggleClass(bgElement, "bg--active", focus);
  };

  const handleInputBlur = e => {
    const span = e.target.nextElementSibling; // Span unit
    span.style.opacity = 1;
  }

  const handleInputMeasure = e => {
    const measure = e.target.dataset.mesurance;
    const measureAttachedA1 = document.querySelector(".measure__attached__a1");
    const measureAttachedA2 = document.querySelector(".measure__attached__a2");
    const measureAttachedB1 = document.querySelector(".measure__attached__b1");
    const measureAttachedB2 = document.querySelector(".measure__attached__b2");

    if (measure === "length") {
      if (e.target.value === "") {
        measureAttachedA1.textContent = 0;
        measureAttachedA2.textContent = 0;
      }
      measureAttachedA1.textContent = `${e.target.value} `;
      measureAttachedA2.textContent = `${e.target.value} `;
    } else if (measure === "depth") {
      if (e.target.value === "") {
        measureAttachedB1.textContent = 0;
        measureAttachedB2.textContent = 0;
      }
      measureAttachedB1.textContent = `${e.target.value} `;
      measureAttachedB2.textContent = `${e.target.value} `;
    }
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
      const colorPicker = parentColorPergola.querySelector(".input__color");

      radioColorPergolas.forEach(radio => radio.checked = false);

      pergolasColor.forEach(label => label.classList.remove("color--selected"));

      const colorSelected = e.target.matches(".label__color__pergola")
        ? e.target
        : e.target.closest(".label__color__pergola");

      const inputSelected = colorSelected.nextElementSibling;
      inputSelected.checked = true;

      colorSelected.classList.add("color--selected");

      if (colorSelected.classList.contains("custom__color")) {
        if (colorPicker) {
          console.log("colorPicker", colorPicker);
          colorPicker.setAttribute("name", "custom-color");
        }
      } else {
        if (colorPicker) colorPicker.removeAttribute("name");
      }

      const colorData = colorSelected.dataset.color;

      if (!colorData) return;

      updateColor(colorData);

      if (checkboxInputColor.checked) updateColorLouvers(colorData);

    } else {
      const parentColorLouver = e.target.closest(".article__color__louvers");
      if (parentColorLouver) {
        const louversColor = parentColorLouver.querySelectorAll(".label__color__louver");
        const radioColorLouvers = parentColorLouver.querySelectorAll(".input__radio__color");
        const colorPickerLouver = parentColorLouver.querySelector(".input__color");

        radioColorLouvers.forEach(radio => radio.checked = false);

        louversColor.forEach(label => label.classList.remove("color--selected"));

        const colorSelectedLouver = e.target.matches(".label__color__louver")
          ? e.target
          : e.target.closest(".label__color__louver");

        const inputSelectedLouver = colorSelectedLouver.nextElementSibling;
        inputSelectedLouver.checked = true;

        colorSelectedLouver.classList.add("color--selected");

        if (colorSelectedLouver.classList.contains("custom__color")) {
          if (colorPickerLouver) {
            console.log("colorPickerLouver", colorPickerLouver);
            colorPickerLouver.setAttribute("name", "custom-color-louver");
          }
        } else {
          if (colorPickerLouver) colorPickerLouver.removeAttribute("name");
        }

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
    } else {
      parentLouver.querySelector(".input__radio__black").checked = true;
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

    if (e.target.checked) {
      colorLouverContainer.querySelector(".input__radio__black").checked = false;
      colorLouverContainer.classList.remove("element--show");
    } else if (!e.target.checked) {
      colorLouverContainer.querySelector(".input__radio__black").checked = true;
      colorLouverContainer.classList.add("element--show");
    }
  }

  const handleAccesoryBtn = e => {
    const containerAccesory = e.target.closest(".choose__accesory__options__content");
    if (!containerAccesory) return;

    const card = e.target.closest(".accesory__card__material__element") || e.target;

    const material = card.dataset.material;

    containerAccesory.querySelectorAll(".accesory__card__material__element").forEach(element => element.classList.remove("accesory__element--selected"));
    card.classList.add("accesory__element--selected");
    
    const groups = containerAccesory.querySelectorAll(".group");

    groups.forEach(group => group.classList.toggle("element--show", group.dataset.group === material));

    const typeMaterialContainer = containerAccesory.querySelector(".accesory__options");

    const allInputs = typeMaterialContainer.querySelectorAll(".input__radio__btn");
    allInputs.forEach(input => input.checked = false);

    const group = Array.from(groups).find(g => g.dataset.group === material);
    if (!group) return;

    const firstRadioBtn = group.querySelector(".input__radio__btn");
    const labelBtns = group.querySelectorAll(".label__action__btn");
    if (!firstRadioBtn) return;
    if (!labelBtns) return;
    labelBtns.forEach(label => label.classList.remove("action__btn--selected"));

    labelBtns[0]?.classList.add("action__btn--selected");
    firstRadioBtn.checked = true;

    if (material === "private") {
      const colorBtns = typeMaterialContainer.querySelectorAll(".accesory__card__color__content");
      if (!colorBtns) return;
      colorBtns.forEach(colorBtn => colorBtn.parentElement.classList.remove("accesory__element--selected"));
      colorBtns[0]?.parentElement.classList.add("accesory__element--selected");
      colorBtns[0].nextElementSibling.checked = true;
    }

    const cardParent = card.closest(".choose__accesory__content");
    const pergolaCard = cardParent.dataset.accesory;

    const pergolaSelector = `.table__attached__${pergolaCard.toLowerCase()}`;
    const pergolaElement = tableAccesory.querySelector(pergolaSelector);

    if (!pergolaElement) return;
    pergolaElement.classList.add("table__attached--active");
  };

  const handleColorAccesoryBtn = e => {
    const parentColor = e.target.closest(".accesory__card__container");
    if (!parentColor) return;

    const cards = parentColor.querySelectorAll(".accesory__card__color__content");

    cards.forEach(card => card.closest(".swiper-slide").classList.remove("accesory__element--selected"));

    const card = e.target.matches(".accesory__card__color__content")
      ? e.target
      : e.target.closest(".accesory__card__color__content");

    if (!card) return;

    card.closest(".swiper-slide").classList.add("accesory__element--selected");

    const cardParent = card.closest(".choose__accesory__content");
    const pergolaCard = cardParent.dataset.accesory;

    const pergolaSelector = `.table__attached__${pergolaCard.toLowerCase()}`;
    const pergolaElement = tableAccesory.querySelector(pergolaSelector);

    if (!pergolaElement) return;

    pergolaElement.classList.add("table__attached--active");
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

  const validateSectionInputs = step => {
    const currentSection = document.getElementById(`form-${step}`);
    const inputs = currentSection.querySelectorAll("input[type='text'], input[type='number'], input[type='email'], input[type='tel'], input[type='url'], input[type='password']");

    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        alertMessage.classList.add("alert__message--show");
      } else {
        alertMessage.classList.remove("alert__message--show");
      }
    });

    return isValid;
  }

  const showAlertMessage = message => {
    const p = alertMessage.querySelector("p");
    p.textContent = message;
    alertMessage.classList.add("alert__message--show");

    setTimeout(() => alertMessage.classList.remove("alert__message--show"), 3000);
  }

  const handleValidationAndNextStep = setp => {
    if (validateSectionInputs(setp - 1)) {
      showSectionForm(setp);
    } else {
      showAlertMessage("Please fill out all required fields.");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Eventos
  btnsMeasure.forEach(btn => btn.addEventListener("click", e => handleMeasureBtn(e)));

  inputRadioBtns.forEach(input => input.addEventListener("change", e => handleRadioBtns(e)));

  formInputs.forEach(input => {
    input.addEventListener("focus", e => handleInputFocus(e.target, true));
    input.addEventListener("blur", e => {
      handleInputFocus(e.target, false);
      handleInputBlur(e);
    });
    input.addEventListener("input", e => handleInputMeasure(e));
  });

  btnsGroupBg.forEach(group => group.addEventListener("click", e => handleGroupBtn(e.target)));

  inputCheckboxContact.addEventListener("change", e => handleCheckboxChange(e.target.checked));

  attachedMeasures.forEach(measure => measure.addEventListener("click", e => toggleCheckBox(e.target.closest(".attached__measure"))));

  colorSelects.forEach(select => select.addEventListener("click", e => handleColorSelect(e)));

  colorInput.forEach(input => input.addEventListener("input", e => handleInputColor(e)));

  checkboxInputColor.addEventListener("change", e => handleCheckboxColor(e));

  /* customColor.forEach(color => {
    const parent = color.closest(".color__select__container");

    parent.querySelectorAll(".input__radio__color").forEach(radio => radio.checked = false);

    const parentRadio = color.closest(".custom__color");
    console.log("parentRadio", parentRadio);
    parentRadio.querySelector("#input-radio-color-louver-custom").checked = true;
  }) */

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

  continueBtn1.addEventListener("click", () => handleValidationAndNextStep(2));

  previousBtn2.addEventListener("click", () => showSectionForm(1));

  continueBtn2.addEventListener("click", () => handleValidationAndNextStep(3));

  previousBtn3.addEventListener("click", () => showSectionForm(2));

  continueBtn3.addEventListener("click", () => handleValidationAndNextStep(4));

  previousBtn4.addEventListener("click", () => showSectionForm(3));

  continueBtn4.addEventListener("click", () => handleValidationAndNextStep(5));

  previousBtn5.addEventListener("click", () => showSectionForm(4));

  chooseHeaderAccesory.forEach(header => header.addEventListener("click", () => header.classList.toggle("choose__header--active")));

  cardsMaterial.forEach(card => card.addEventListener("click", e => handleAccesoryBtn(e)));

  cardsMaterialColor.forEach(card => card.addEventListener("click", e => handleColorAccesoryBtn(e)));

  // Obtener los datos del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();

    const terms = document.getElementById("input-checkbox-terms");

    if (!terms.checked) {
      showAlertMessage("Please accept the terms and conditions.");
      return;
    }

    const data = Object.fromEntries(new FormData(e.target));

    const data2 = {
      "body": data
    }

    // console.log(data);
    console.log(data2);

    /* fetch('https://hook.us1.make.com/6aotgx2a8zeiqbx7vpf68vbq70it2udh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(data2),
    })
      .then(response => {
        if (response.ok) {
          window.location.href = "/?success=true"
        } else {
          console.error('Error sending data');
        }
      })
      .catch(error => console.error('Fetch error:', error)); */
  }); 
});