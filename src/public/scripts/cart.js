$(document).ready(() => {
    var phoneMask = IMask(
        document.getElementById('phone'), {
        mask: '(00) 00000-0000'
    });
    var cnpjMask = IMask(
        document.getElementById('cnpj'), {
        mask: '00.000.000/0000-00'
    }); 
    var cepMask = IMask(
        document.getElementById('cep'), {
        mask: '00000-000'
    }); 
})