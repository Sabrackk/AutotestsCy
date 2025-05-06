describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    it('1. Верный логин и верный пароль', function () {
         cy.get('#mail').type('german@dolnikov.ru');                      // Вводим верный логин
         cy.get('#pass').type('iLoveqastudio1');                          // Вводим верный пароль
         cy.get('#loginButton').click();                                  // Нажимаем кнопку войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Видим окно Авторизация прошла успешно
         cy.get('#messageHeader').should('be.visible');                   // Окно с результатом видно пользователю    
         cy.get('#exitMessageButton > .exitIcon').should('be.visible')    // Кнопка закрыть (крестик) вида пользователю
     }),
     
     it('2. Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();                                       // Нажимаем кнопку восстановить пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');                           // Вводим почту
        cy.get('#restoreEmailButton').click();                                      // Нажимаем "Отправить код"
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');    // Сообщение "Успешно отправили пароль на e-mail"  
        cy.get('#messageHeader').should('be.visible');                              // Окно с результатом видно пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')               // Кнопка закрыть (крестик) вида пользователю
    }),
    
    it('3. Верный логин и НЕверный пароль', function () {
        cy.get('#mail').type('german@dolnikov.ru');                        // Вводим верный логин
        cy.get('#pass').type('iLoveqastudio123');                          // Вводим верный пароль
        cy.get('#loginButton').click();                                    // Нажимаем кнопку войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Сообщение "Такого логина или пароля нет"
        cy.get('#messageHeader').should('be.visible');                     // Окно с результатом видно пользователю    
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')      // Кнопка закрыть (крестик) вида пользователю
    }),
    
    it('4. НЕверный логин и верный пароль', function () {
        cy.get('#mail').type('german@dolnikov.com');                        // Вводим неверный логин
        cy.get('#pass').type('iLoveqastudio1');                             // Вводим верный пароль
        cy.get('#loginButton').click();                                     // Нажимаем кнопку войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет');  // Сообщение "Такого логина или пароля нет"
        cy.get('#messageHeader').should('be.visible');                      // Окно с результатом видно пользователю    
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')       // Кнопка закрыть (крестик) вида пользователю
    }),
    
    it('5. Логин без @', function () {
        cy.get('#mail').type('germandolnikov.ru');                                  // Вводим логин без @
        cy.get('#pass').type('iLoveqastudio1');                                     // Вводим верный пароль или любой другой
        cy.get('#loginButton').click();                                             // Нажимаем кнопку войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');    // Сообщение "Нужно исправить проблему валидации"
        cy.get('#messageHeader').should('be.visible');                              // Окно с результатом видно пользователю    
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')               // Кнопка закрыть вида пользователю
    })

 }),
 describe ('Покупка аватара в покемонах', function(){
    it('Покупка аватара в покемонах', function(){
        cy.visit('https://pokemonbattle.ru/login');                                                         // Заходим на сайт покемонов
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.get('#k_email').type('USER_LOGIN');                                                              // Вводим правильный логин
        cy.get('#k_password').type('USER_PASSWORD');                                                        // Вводим правильный пароль
        cy.get('.MuiButton-root').click();                                                                  // Нажимаем кнопку "Войти"
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.url().should('include', 'https://pokemonbattle.ru/');                                            // Проверяем, что нас перекинуло на нужную страницу с покемонами
        cy.get('.header_card_trainer').click();                                                             // Нажимаем на карточку нашего тренера
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.url().should('include', 'https://pokemonbattle.ru/trainer/29404');                               // Проверяем, что нас перекинуло на страничку нашего тренера
        cy.get('.k_mobile > :nth-child(5)').click();                                                        // Нажимаем кнопку "Сменить аватар"
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.url().should('include', 'https://pokemonbattle.ru/shop');                                        // Проверяем, что нас перекинуло в магазин аватаров
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.get('button').then($buttons => {                                                                 // Нажимаем на кнопку "Купить"
            const randomIndex = Math.floor(Math.random() * $buttons.length);
            cy.wrap($buttons[randomIndex]).click()});
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4620869113632996');   // Вводим номер банковской карты
        cy.get(':nth-child(1) > .style_1_base_input').type('1226');                                         // Вводим срок действия карты
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125');         // Вводим CVV-код
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('NAME');                    // Вводим имя и фамилию владельца карты
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();                 // Нажимаем кнопку "Оплатить"
        cy.get('.style_1_base_input').type(56456);                                                          // Вводим код из смс
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();                 // Нажимаем кнопку "Оплатить"
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно');                             // Сообщение "Покупка прошла успешно"
        cy.get('.success__image').should('be.visible');                                                     // Картинка видна пользователю
        cy.get('.payment_status_top_title').should('be.visible');                                           // Сообщение "Покупка прошла успешно" видно пользователю
        cy.get('.style_1_base_link_blue').click();                                                          // Нажимаем кнопку "Вернуться в магазин"
        cy.wait(2000);                                                                                      // Ожидаем 2с
        cy.url().should('include', 'https://pokemonbattle.ru/shop');                                        // Проверяем, что нас перекинуло в магазин тренеров
        cy.get('.header_card_trainer').click();                                                             // Нажимаем на карточку нашего тренера
        cy.url().should('include', 'https://pokemonbattle.ru/trainer/29404')                                // Наслаждаемся видом нового тренера)
    })
 })
 