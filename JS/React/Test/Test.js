/**
# Testing Basics

> Подходы:
@ TDD - Test Driven Development написание тестов, а потом на основании написанных тестов - создание логики;
@ BDD - Behavior Driven Development TDD + описание тестировщиком или бизнес аналитоком пользовательских сценариев;


> Типы:
 * End-to-End (E2E) - проверяется работа всего приложения или фактически описанные раннее бизнес кейсы (пользователь зашел на страницу | нажал кнопку вызова модалки);
 * Integration Testing - проверка взаимодействия созданного модуля с другими;
 * Unit Testing - проверка логики инкапсулированного модуля (или юнита);

@ STUB & MOCK - объекты, которые создаются и используются взамен реальных объектов, с которыми взаимодействует модуль в процессе своей работы.

 * STUB - статичный объект, имеющий структуру валидного ответа
initialize -> exercise -> verify
 * MOCK - настраиваемый объект, которые позволяют задать ожидания в виде своего рода спецификации вызовов, которые мы планируем получить.
initialize -> set expectations -> exercise -> verify

не ниже ~90% - покрытие тестами
 */

// Example:
describe('MakeMomentJSGreatAgain', () => {
	it('handles 30-day months', () => {
		const date = new MakeMomentJSGreatAgain('1/1/2015')
		date.addDays(30);
		date.shouldEqual('1/31/2015', date);
	})

	it('handles leap year', () => {
		const date = new MakeMomentJSGreatAgain('2/1/2016')
		date.addDays(28);
		date.shouldEqual('2/29/2016', date);
	})

	it('handles non-leap year', () => {
		const date = new MakeMomentJSGreatAgain('2/1/2015')
		date.addDays(28);
		date.shouldEqual('03/01/2015', date);
	})
})
