<?php

namespace RefactoringGuru\Memento\Structural;

/**
 * Паттерн Снимок
 *
 * Назначение: Фиксирует и восстанавливает внутреннее состояние объекта таким
 * образом, чтобы  в дальнейшем объект можно было восстановить в этом состоянии
 * без нарушения инкапсуляции.
 */

/**
 * Создатель содержит некоторое важное состояние, которое может со временем
 * меняться. Он также объявляет метод сохранения состояния внутри снимка и метод
 * восстановления состояния из него.
 */
class Originator
{
    /**
     * @var mixed Для удобства состояние создателя хранится внутри одной
     * переменной.
     */
    private $state;

    public function __construct(string $state)
    {
        $this->state = $state;
        echo "Originator: My initial state is: {$this->state}\n";
    }

    /**
     * Бизнес-логика Создателя может повлиять на его внутреннее состояние.
     * Поэтому клиент должен выполнить резервное копирование состояния с помощью
     * метода save перед запуском методов бизнес-логики.
     */
    public function doSomething(): void
    {
        echo "Originator: I'm doing something important.\n";
        $this->state = $this->generateRandomString(30);
        echo "Originator: and my state has changed to: {$this->state}\n";
    }

    private function generateRandomString(int $length = 10): string
    {
        return substr(
            str_shuffle(
                str_repeat(
                    $x = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                    ceil($length / strlen($x))
                )
            ),
            1,
            $length,
        );
    }

    /**
     * Сохранияет текущее состояние внутри снимка.
     *
     * @return Memento
     */
    public function save(): Memento
    {
        return new ConcreteMemento($this->state);
    }

    /**
     * Восстанавливает состояние Создателя из объекта снимка.
     *
     * @param Memento $memento
     * @throws \Exception
     */
    public function restore(Memento $memento): void
    {
        if (! $memento instanceof ConcreteMemento) {
            throw new \Exception("Unknown memento class ".get_class($memento));
        }

        $this->state = $memento->getState();
        echo "Originator: My state has changed to: {$this->state}\n";
    }
}

/**
 * Интерфейс Снимка предоставляет способ извлечения метаданных снимка, таких как
 * дата создания или название. Однако он не раскрывает состояние Создателя.
 */
interface Memento
{
    public function getName(): string;

    public function getDate(): string;
}

/**
 * Конкретный снимок содержит инфраструктуру для хранения состояния Создателя.
 */
class ConcreteMemento implements Memento
{
    private $state;

    private $date;

    public function __construct(string $state)
    {
        $this->state = $state;
        $this->date = date('Y-m-d H:i:s');
    }

    /**
     * Создатель использует этот метод, когда восстанавливает своё состояние.
     */
    public function getState(): string
    {
        return $this->state;
    }

    /**
     * Остальные методы используются Опекуном для отображения метаданных.
     */
    public function getName(): string
    {
        return $this->date." / (".substr($this->state, 0, 9)."...)";
    }

    public function getDate(): string
    {
        return $this->date;
    }
}

/**
 * Опекун не зависит от класса Конкретного Снимка. Таким образом, он не имеет
 * доступа к состоянию создателя, хранящемуся внутри снимка. Он работает со
 * всеми снимками через базовый интерфейс Снимка.
 */
class Caretaker
{
    /**
     * @var Memento[]
     */
    private $mementos = [];

    /**
     * @var Originator
     */
    private $originator;

    public function __construct(Originator $originator)
    {
        $this->originator = $originator;
    }

    public function backup(): void
    {
        echo "\nCaretaker: Saving Originator's state...\n";
        $this->mementos[] = $this->originator->save();
    }

    public function undo(): void
    {
        if (! count($this->mementos)) {
            return;
        }
        $memento = array_pop($this->mementos);

        echo "Caretaker: Restoring state to: ".$memento->getName()."\n";
        try {
            $this->originator->restore($memento);
        } catch (\Exception $e) {
            $this->undo();
        }
    }

    public function showHistory(): void
    {
        echo "Caretaker: Here's the list of mementos:\n";
        foreach ($this->mementos as $memento) {
            echo $memento->getName()."\n";
        }
    }
}

/**
 * Клиентский код.
 */
$originator = new Originator("Super-duper-super-puper-super.");
$caretaker = new Caretaker($originator);

$caretaker->backup();
$originator->doSomething();

$caretaker->backup();
$originator->doSomething();

$caretaker->backup();
$originator->doSomething();

echo "\n";
$caretaker->showHistory();

echo "\nClient: Now, let's rollback!\n\n";
$caretaker->undo();

echo "\nClient: Once more!\n\n";
$caretaker->undo();
