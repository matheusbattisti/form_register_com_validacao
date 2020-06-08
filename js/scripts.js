class Validator {

  constructor() {
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-email-validate',
      'data-required',
      'data-equal',
    ]
  }

  // inicia a validação de todos os campos
  validate(form) {

    // limpa todas as validações antigas
    let currentValidations = document.querySelectorAll('form .error-validation');

    if(currentValidations.length) {
      this.cleanValidations(currentValidations);
    }

    // pegar todos inputs
    let inputs = form.getElementsByTagName('input');
    // transformar HTMLCollection em arr
    var inputsArray = [...inputs];

    // loop nos inputs e validação mediante aos atributos encontrados
    inputsArray.forEach(function(input, obj) {

      // fazer validação de acordo com o atributo do input
      for(let i = 0; this.validations.length > i; i++) {
        if(input.getAttribute(this.validations[i]) != null) {

          // limpa string para saber o método
          let method = this.validations[i].replace("data-", "").replace("-", "");

          console.log(method);

          // valor do input
          let value = input.getAttribute(this.validations[i])

          // invoca o método
          this[method](input,value);

        }
      }

    }, this);

  }

  // método para validar se tem um mínimo de caracteres
  minlength(input, minValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar e-mail
  emailvalidate(input) {
    var re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão matheus@email.com`;

    console.log('oi');

    if(!re.test(email)) {
      this.printMessage(input, errorMessage);
    }

  }

  // verificar se um campo está igual o outro
  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    console.log(inputToCompare);

    let inputToCompareName = inputToCompare.getAttribute("name");;

    let errorMessage = `Este campo precisa estar igual ao ${inputToCompareName}`;

    if(input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }
  
  // método para exibir inputs que são necessários
  required(input) {

    let errorMessage = `Este campo é obrigatório`;

    this.printMessage(input, errorMessage);
    
  }

  // método para imprimir mensagens de erro
  printMessage(input, msg) {
  
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if(errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
  
      let inputParent = input.parentNode;
  
      template.classList.remove('template');
  
      inputParent.appendChild(template);
    }

  }

  // remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();

  validator.validate(form);
});

