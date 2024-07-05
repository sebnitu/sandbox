import "https://unpkg.com/imask";

const masks = {
  "phone": {
    mask: "(000) 000-0000"
  },
  "phone-ext": {
    mask: "(000) 000-0000 [x0000]"
  },
  "ssn": {
    mask: "000-00-0000"
  },
  "mileage": {
    mask: Number,
    min: 0,
    max: 9999999,
    thousandsSeparator: ','
  },
  "percent": {
    mask: Number,
    min: 0,
    max: 100,
    scale: 2,
    radix: '.'
  },
  "money": {
    mask: Number,
    min: 0,
    max: 999999,
    thousandsSeparator: ','
  },
  "money-cents": {
    mask: Number,
    min: 0,
    max: 999999.99,
    thousandsSeparator: ',',
    scale: 2,
    radix: '.',
    padFractionalZeros: true
  },
  "date": {
    mask: "MM-DD-YYYY",
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31
      },
      YYYY: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 9999
      }
    }
  },
  "time": {
    mask: "HH:MM",
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }
  }
};

const els = document.querySelectorAll("[data-inputmask]");
els.forEach((el) => {
  const key = el.getAttribute("data-inputmask");
  IMask(el, masks[key]);
});
