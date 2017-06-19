
      let generateCake = (() => {

        let $target = $('#target');
        let selectedCake;
        let cake = [
          {
            type: "Chocolate",
            ingredient: 'cocoa',            
            taste: "chocolatey goodness"
          },
          {
            type: "Strawberry",
            ingredient: 'strawberries',
            taste: "berry berry nice"
          },
          {
            type: "Butterscotch",
            ingredient: 'caramel',
            taste: "creamy caramel clouds"
          },          
        ]

        let init = (() => {
          _render();
          _bindUIevents();
        })();

        function _render() {
          $.get('template/cakeGen.html', (template) => {
            let rendered = Mustache.render(template, cake[_getRandomNumberBetween(0,2)]);
            $target.html(rendered);
          });
        }

        function _getRandomNumberBetween(min, max) {
          let randomNumber,
            numberMin = min, 
            numberMax = max;

          for (let noOfTries = 0; noOfTries < 3; noOfTries++) {
            randomNumber = Math.round(Math.random() * (numberMax - numberMin) + numberMin);

            if (randomNumber != selectedCake) {
              selectedCake = randomNumber;
              return selectedCake;
            } 

            if (noOfTries === 2) {
              selectedCake = selectedCake != 0 ? 0 : 1;
              return selectedCake; 
            } 
          }
        }

        function _bindUIevents() {
          $target.delegate('button', 'click', () => {
            _render();
          });
        };

      })();