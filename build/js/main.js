
      let generateCake = (() => {

        let $description = $('#description'), 
            $menu = $('#menu'),
            selectedCake = 0,

            store = {
              cakes: [
                {
                  type: "Chocolate",
                  ingredient: 'cocoa',            
                  taste: "chocolatey goodness",
                  status: 'btn-primary'
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
              ], 
              index: function() {
                for (let cake = 0; cake < store.cakes.length; cake++) {
                  if (store.cakes[cake].type === this.type) {
                    return cake;
                  }
                }
              }
            };

        // initialize scripts
        render();
        bindUIevents();
        bindStoreEvents(store);

        function render() {
          _generateCake('template/description.html', store.cakes[selectedCake], $description);
          _generateCake('template/menu.html', store, $menu);
        }

        function _generateCake(templateUrl, getCake, destination) {
          $.get(templateUrl, (template) => {
            let rendered = Mustache.render(template, getCake);
            destination.html(rendered);
          });
        }

        function bindUIevents() {
          $menu.delegate('button', 'click', (button) => {

            selectedCake = button.currentTarget.dataset.index ? button.currentTarget.dataset.index : _getRandomNumberBetween(0,2);
            events.emit('store.update.selected.cake', selectedCake);
            render(button.currentTarget.dataset);
          });
        };

        function _getRandomNumberBetween(min, max) {
          let randomNumber,
            numberMin = min, 
            numberMax = max,
            maxTries = 3;

          for (let noOfTries = 0; noOfTries < maxTries; noOfTries++) {
            randomNumber = Math.round(Math.random() * (numberMax - numberMin) + numberMin);

            if (randomNumber != selectedCake) {
              selectedCake = randomNumber;
              return selectedCake;
            } 

            if (noOfTries === (maxTries - 1)) {
              selectedCake = selectedCake != 0 ? 0 : 1;
              return selectedCake;
            } 
          }
        }

        function bindStoreEvents(store) {
          events.on('store.update.selected.cake', (selectedCake) => {
            _setCakeAsSelected(store.cakes, selectedCake);
          });
        }

        function _setCakeAsSelected(cakes, selectedCake) {
          cakes.forEach((cake, index) => {
            cake.status = (index != selectedCake) ? '' : 'btn-primary';
          });
        }

      })();