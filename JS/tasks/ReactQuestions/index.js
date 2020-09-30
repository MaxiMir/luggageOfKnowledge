/**
 => ВОПРОС #1: В браузере есть интерфейс DocumentFragment.
 При этом виртуальный DOM React-а реализует относительно схожую функциональность.
 Пожалуйста, расскажите, в чем их сходства/различия?

 => ОТВЕТ:
 Сходства:
 > Должны были решить проблему производительности.
 > Данные хранятся в памяти

 Различия:
 > Производительность:
 - DocumentFragment (уже не решает):
 DocumentFragment - контейнер для коллекции DOM-узлов.
 DocumentFragment хранит элементы в памяти, а значит, при добавлении нового элемента браузеру не надо делать reflow и repaint (в отличие от прямой вставки элемента в DOM дерево).
 Эта оптимизация работает в старых браузерах, в новых эффект меньше или отрицательный.

 - Виртуальный DOM (решает)
 Самые дорогие операции в DOM дереве эта работа с его элементами(поиск/добавление/изменение/удаление).
 А поскольку со временем сложность пользовательских интерфейсов увеличилась, придумали Виртуальный DOM.
 Виртуальный DOM - это прослойка в виде легковесного объекта JS, имитирующего DOM-дерево. Включает в себя подход + набор библиотек + алгоритмов.
 Из JS-объекта создается HTML, который вставляется или добавляется к нужному DOM-элементу (что вызывает перерисовку страницы в браузере).
 С помощью алгоритмов, например, определяются где и какие изменения нужно перенести из Виртуального DOM в DOM.

 > Тип:
 - DocumentFragment: Интерфейс веб API
 - Виртуальный DOM: Библиотека

 > Официальная спецификация:
 - DocumentFragment +
 - Виртуальный DOM -
 **/


/**
 => ВОПРОС #2. Зачем нужен hook useMemo? Приведите пример или кейс, когда его использование оправдано.

 => ОТВЕТ:
 getMenuItems - генерирует данные для меню из данных, которые пришли с API.
 В компоненте есть useState, а значитБ при изменении данных в нем будет происходить перерендеринг компонента и функция getMenuItems будет заново проходится по большому массиву.
 useMemo - позволяет решить данную проблему храня результат вычисления функции между рендерами.
 */

import dynamic from 'next/dynamic'
import {useState, useMemo, useContext} from 'react'
import {useSelector} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled, {keyframes} from 'styled-components'
import {PopupContext} from 'context/popup/popupContext'
import {HeaderMainMenuLeft} from './HeaderMainMenuLeft'
import {HeaderMainMenuRight} from './HeaderMainMenuRight'
import {THEME} from 'theme'

const AppBackdrop = dynamic(() =>
    import('components/UI/AppBackdrop')
)

export const HeaderMainMenu = () => {
    const {items} = useSelector(state => state.menu)
    const [menuNumber, setMenuNumber] = useState(0)
    const {showMainMenu, toggleMainMenu} = useContext(PopupContext)
    const {leftMenuItems, rightMenuItems} = useMemo(() => getMenuItems(items), [])
    const currentRightMenuItems = rightMenuItems[menuNumber]
    const MenuContainerComponent = !showMainMenu
        ? MenuContainerHidden
        : MenuContainerVisible

    return (
        <>
            <MenuContainerComponent>
                <Container>
                    <Row>
                        <HeaderMainMenuLeft
                            items={leftMenuItems}
                            menuNumber={menuNumber}
                            setMenuNumber={setMenuNumber}
                        />
                        <HeaderMainMenuRight items={currentRightMenuItems}/>
                    </Row>
                </Container>
            </MenuContainerComponent>
            {showMainMenu && <AppBackdrop onClose={toggleMainMenu}/>}
        </>
    )
}

function getMenuItems(items) {
    const initialAcc = {
        leftMenuItems: [],
        rightMenuItems: []
    }

    return items.reduce((acc, {items, ...restData}) => {
        acc.leftMenuItems.push({...restData})
        acc.rightMenuItems.push(items)

        return acc
    }, initialAcc)
}

const fadeInLeft = keyframes`
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`
const MenuContainer = styled.div`
  width: 100%;
  min-height: 740px;
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0;
  background: linear-gradient(
    to right,
    ${THEME.BACKGROUND_COLOR} 300px,
    ${THEME.WHITE_COLOR}
  );
`
const MenuContainerVisible = styled(MenuContainer)`
  display: block;
  z-index: 1000;
  animation: ${fadeInLeft} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`
const MenuContainerHidden = styled(MenuContainer)`
  display: none;
`
