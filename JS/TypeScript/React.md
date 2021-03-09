```shell script
$ npx create-react-app react-typescript --template typescript # --template typescript - флаг, включающий все зависимости для работы с TS

```
### FUNCTIONAL COMPONENT:
```typescript jsx
type HeaderProps = {
	text: string
}

const Header = ({text}: HeaderProps) => <b>{text}</b>
```
```typescript jsx
const HeaderWithoutType: React.FC<{text: string}> = ({text}) => <b>{text}</b>
```
### CLASS:
```typescript jsx
type CounterProps = {
   title?: string
}

type CounterState = {
   count: number
}

class Counter extends Component<CounterProps, CounterState> { // {типизация props}, {типизация state}
	//state = {
	// 	count: 0
	// }

	constructor(props: CounterProps) {
		super(props)

		this.state = {
			count: 0
		}
	}

	static defaultProps: CounterProps = {
		title: "Default title"
	}

	static getDerivedStateFromProps(props: CounterProps, state: CounterState): CounterState | null { // возвращает объект | null для обновления состояния 
		return true ? null : {count: 2}
	}

	componentDidMount(): void {

	}

	shouldComponentUpdate(nextProps: CounterProps, nextState: CounterState): boolean {
		return true
	}

	handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => { // тип события + тип элементов на которые вешаем | React.SyntheticEvent - без уточнения события
        console.log(`${e.clientX}, ${e.clientY}`) 

		this.setState(({count}) => ({
			count: +count
		}))
	}

	render() {
		return (
			<div>
				<p>{this.props.title}{this.state.count}</p>
				<button onClick={this.handleClick}>+1</button>
                <a href="#" onClick={this.handleClick}>Link</a>
			</div>
		)
	}
}
const App: React.FC = () => <Counter title="Counter: "/>

export default App
```
```typescript jsx
class Form extends Comment<{}, {}> {
   handleCopy = (e: React.ClipboadEvent<HTMLInputElement>): void => {
      console.log('Coppied!')
   }

   handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      
   }

   handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      console.log('Submitted')
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <label>
               Simple text:
               <input 
                  type="text"
                  name="text"
                  onCopy={this.handleCopy}
                  onFocus={this.handleFocus}
               />               
            </label>
            <button type="submit">Submit</button>
         </form>
      )  
   }
}

const App: React.FC = () => <Form/>

export default App
```
```typescript jsx
type POSITION = {
   id: string,
   value: string,
   title: string
}

type FormState = {
   inputText: string,
   textareaText: string,
   selectText: string,
   showData: {
      name: string,
      text: string,
      position: string
   }
}

const POSITIONS: Array<POSITION> = [
   {
      id: 'fd',
      value: 'Frontend Developer',
      title: 'Frontend Developer',
   },
   {
      id: 'bd',
      value: 'Backend Developer',
      title: 'Backend Developer',
   }
]

const DEFAULT_SELECT_VALUE: string = POSITIONS[0].value
const styles: React.CSSProperties = {display: 'block', marginBottom: '10px'}

class Form extends Component<{}, FormState> {
   private selectRef = React.createRef<HTMLSelectElement>() // типизация ссылки
   
   state = {
   	  inputText: '',
      textareaText: '',
      selectText: DEFAULT_SELECT_VALUE,
      showData: {
         name: '',
         text: '',
         position: ''
      }  
   }

   handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const {target: {value: inputText}} = e

      this.setState({inputText})
   }

   handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const {target: {value: textareaText}} = e

      this.setState({textareaText})
   }

   handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const {target: {value: selectText}} = e

      this.setState({selectText})
   }

   handleShow = (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault()

      const {inputText, textareaText, selectText} = this.state
   
      this.setState({
         inputText: '',
         textareaText: '',
         selectText: DEFAULT_SELECT_VALUE,
         showData: {
            name: inputText,
            textareaText: '',
            position: selectText    
         }
      })
   }

   render() {
      const {inputText, textareaText, selectText, showData} = this.state   
      const {name, text, position} = showData

      return (
          <label style={styles}>
             Name:
             <input 
                type="text"
                value={inputText}
                onChange={this.handleInputChange}
             />               
          </label>

          <label style={styles}>
             Text:
             <textarea 
                type="text"
                value={textareaText}
                onChange={this.handleTextareaChange}
             />               
          </label>
         <select 
            style={styles}
            value={selectText}
            onChange={this.handleSelectChange}
            ref={this.selectRef}
         >
         
         </select>
      )  
   }
}
```
### PORTAL (ver. >= 16.3):
Нативный React компонент, который рендерит свое содержимое в любую часть DOM дерева (т.е. вне корневого дива).
Применяется для модальных окон, всплывающих подсказок, тултипов и тд.
```typescript jsx
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

type PortalProps = {
   children: React.ReactNode
}

class Portal extends Component<PortalProps> {
   private el: HTMLDivElement = document.createElement('div')

   public componentDidMount(): void {
      document.body.appendChild(this.el)
   }

   public componentWillUnmount(): void {
      document.body.removeChild(this.el)
   }

   public render(): React.ReactElement<PortalProps> {
      return ReactDOM.createPortal(this.props.children, this.el)
   }
}

/**
 children: JSX.Element # doesn`t account for arrays
 children: JSX.Element | JSX.Element[] # doesn`t accept functions
 children: JSX.ReactChildren # Despite the name, not at all an appropriate type
 children: JSX.ReactChild[] # Better
 children: JSX.ReactNode # Best, accepts everything
*/

class SomeComponent extends Component {
   render() {
      return (
         <div>
            <h1>SomeComponent</h1>
            <Portal>
               <div>TEST PORTAL</div>
            </Portal>
         </div>
      )
   }
}
```
### CONTEXT:
```typescript jsx
interface IContext {
   isAuth: Boolean,
   toggleAuth: () => void
}

// Context creation:
const AuthContext = React.createContext<IContext>({
   isAuth: false,
   toggleAuth: () => {}
})

// Inner component (new syntax of static property):
class Login extends Comment {
   static contextType = AuthContext
   context!: React.ContextType<typeof AuthContext>

   render() {
      const {isAuth, toggleAuth} = this.context
      
      return (
         <button onClick={toggleAuth}>
            {!isAuth ? 'Login' : 'Logout'}
         </button>
      )  
   }
}

// Inner component (old variant with Consumer):
const Profile: React.FC = (): React.React.Element => (
   <AuthContext.Consumer>
      {({isAuth}: IContext) => (
         <h1>{!isAuth ? 'Please login' : 'You are logged in'}</h1>
      )}
   </AuthContext.Consumer>
)

// Root component:
class Context extends Component<{}, {isAuth: Boolean}> {
   readonly state: {
      isAuth: false
   }

   toggleAuth = () => {
      this.setState(({isAuth}) => ({isAuth: !isAuth})
   }

   render() {
      const {isAuth} = this.state
      const context: IContext = {isAuth, toggleAuth: this.toggleAuth}

      return (
         <AuthContext.Provider value={context}>
            <Login/>
            <Profile/>
         </AuthContext.Provider>
      )
   }
}
```
### HOOK useState:
* Inferred as number:
```typescript jsx
const [value, setValue] = useState(0) // при простом значении типизацию делать не надо
```
* Explicitly setting the types:
```typescript jsx
const [value, setValue] = useState<number | undefined>(undefined) // дефолтное значение - undefined
```
```typescript jsx
const [value, setValue] = useState<Array<number>>([]) // дефолтное значение - []
```
```typescript jsx
interface IUser {
   name: sttring,
   age?: number
}

const [value, setValue] = useState<IUser>({name: 'Maxim'})
```
### HOOK useRef:
```typescript jsx
const ref1 = useRef<HTMLElement>(null!) // ref1.current - будет доступен только для чтения и управляемой только через react
const ref2 = useRef<HTMLElement | null>(null) // ref2.current - будет модифицируемым и управляемым мной
```
### HOOK useContext:
```typescript jsx
interface ITheme {
   backgroundColor: string,
   color: string
}

// Context creation:
const ThemeContext = createContext<ITheme>({
   backgroundColor: 'black',
   color: 'white'   
})

// Accessing context in a child component:
const themeContext = useContext<ITheme>(ThemeContext)
```
### HOOK useReducer:
```typescript jsx
interface State {
   count: number
}

type Action = {
   type: 'increment' | 'decrement'
}

const counterReducer = ({count}: State, {type}: Action) => {
   switch (type) {
      case "increment": return {count: count + 1}
      case "decrement": return {count: count - 1}
      default: return {}
   }
}

const [state, dispatch] = useReducer(counterReducer, {count: 0})


dispatch({type: 'increment'}) 
dispatch({type: 'decrement'}) 
```
### HOOK useCallback & useMemo:
* Inferred as number:
```typescript jsx
const memoizedCallback = useCallback(() => {sum(a, b)}, [a, b])
```
* Inferred as (value1: number, value2: number) => number:
```typescript jsx
const memoizedValue = useMemo((a: number, b: number) => {sum(a, b)}, [a, b])
```
### HOOK useEffect & useLayoutEffect:
```typescript jsx
useEffect(() => {
   const subscriber = subsribe(options)

  return () => {
    unsubscribe(subscriber)
  };
}, [options]);
```
### HOC:
```typescript jsx
type BaseProps = {
   primTitle: string,
   secTitle?: string
}

type InjectedProps = {
   toggleStatus: Boolean,
   toggle: () => void
}

const Button = ({primTitle, secTitle, toggle, toggleStatus}: any) => (
   <button onClick={toggle}>
      {toggleStatus ? primTitle : secTitle}
   </button>
)

const withToggle = <BaseProps extends InjectedProps>(PassedComponent: React.ComponentType<BaseProps>) => {
   return (props: BaseProps) => {
      const [toggleStatus, toggle] = useState(false)
    
      return (
         <PassedComponent
            {...props as BaseProps}
            toggle={() => toggle(!toggleStatus)}
            toggleStatus={toggleStatus}   
         />
      )  
   }
}

const ToggleButton = withToggle(Button)

const App: React.FC = () => <ToggleButton primTitle="Main Title" secTitle="Additional Title"/>

export default App
```
```typescript jsx
interface WithLoadingProps {
   loading: boolean
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
    class WithLoading extends React.Component<P & WithLoadingProps> {
	  render() {
	     const {loading, ...props} = this.props

         return loading ? <LoadingSpinner/> : <Component {...props as P}/>
      }
    }
}
```
### HTTP RESPONSE:
```ts
interface HttpResponse<T> extends Response {
	parsedBody?: T
	status: number,
	redirect: boolean
	// ... and other necessary parameters
}

export async function http<T>(request: string): Promise<HttpResponse<T>> {
	const response: HttpResponse<T> = await fetch(request)
	
   try {
      response.parsedBody = await response.json()
   } catch (ex) {}
   
   if (!response.ok) {
      // Error if there is response status issue
      throw new Error(response.statusText)
   }
	
   return response
}

interface IPost {
	title?: string,
	body?: string,
}

try {
   const resp = await http<IPost>('https://jsonplaceholder.typicode.com/posts/')
} catch (resp) {
   console.error('Error', resp)
}
```
