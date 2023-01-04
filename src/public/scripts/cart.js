import IMask from 'imask';

var phoneMask = IMask(
    document.getElementById('phone'), {
      mask: '+{55}(00)00000-0000'
    });
