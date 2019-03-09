<?php

namespace RefactoringGuru\ChainOfResponsibility\Structural;

/**
 * Паттерн Цепочка обязанностей
 *
 * Назначение: Позволяет избежать привязки отправителя запроса к его получателю,
 * предоставляя возможность обработать запрос нескольким объектам.  Связывает в
 * цепочку объекты-получатели, а затем передаёт запрос по цепочке, пока некий
 * получатель не обработает его.
 */

/**
 * Интерфейс Обработчика объявляет метод построения цепочки обработчиков. Он
 * также объявляет метод для выполнения запроса.
 */
interface Handler
{
    public function setNext(Handler $handler): Handler;

    public function handle($request): ?string;
}

/**
 * Поведение цепочки по умолчанию может быть реализовано внутри базового класса
 * обработчика.
 */
abstract class AbstractHandler implements Handler
{
    /**
     * @var Handler
     */
    private $nextHandler;

    /**
     * @param Handler $handler
     * @return Handler
     */
    public function setNext(Handler $handler): Handler
    {
        $this->nextHandler = $handler;
        // Возврат обработчика отсюда позволит связать обработчики простым
        // способом, вот так:
        // $monkey->setNext($squirrel)->setNext($dog);
        return $handler;
    }

    public function handle($request): ?string
    {
        if ($this->nextHandler) {
            return $this->nextHandler->handle($request);
        }
        
        return null;
    }
}

/**
 * Все Конкретные Обработчики либо обрабатывают запрос, либо передают его
 * следующему обработчику в цепочке.
 */
class MonkeyHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "Banana") {
            return "Monkey: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

class SquirrelHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "Nut") {
            return "Squirrel: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

class DogHandler extends AbstractHandler
{
    public function handle($request): ?string
    {
        if ($request == "MeatBall") {
            return "Dog: I'll eat the ".$request.".\n";
        } else {
            return parent::handle($request);
        }
    }
}

/**
 * Обычно клиентский код приспособлен для работы с единственным обработчиком. В
 * большинстве случаев клиенту даже неизвестно, что этот обработчик является
 * частью цепочки.
 */
function clientCode(Handler $handler)
{
    foreach (["Nut", "Banana", "Cup of coffee"] as $food) {
        echo "Client: Who wants a ".$food."?\n";
        $result = $handler->handle($food);
        if ($result) {
            echo "  ".$result;
        } else {
            echo "  ".$food." was left untouched.\n";
        }
    }
}

/**
 * Другая часть клиентского кода создает саму цепочку.
 */
$monkey = new MonkeyHandler;
$squirrel = new SquirrelHandler;
$dog = new DogHandler;

$monkey->setNext($squirrel)->setNext($dog);

/**
 * Клиент должен иметь возможность отправлять запрос любому обработчику, а не
 * только первому в цепочке.
 */
echo "Chain: Monkey > Squirrel > Dog\n\n";
clientCode($monkey);
echo "\n";

echo "Subchain: Squirrel > Dog\n\n";
clientCode($squirrel);
