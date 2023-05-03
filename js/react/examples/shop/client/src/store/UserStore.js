import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._isAuth = false // _ - соглашение о том что эта переменная не изменяема
		this._user = {}
		makeAutoObservable(this) // слежение за изменением этих переменных -> перендеринг
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setUser(user) {
		this._user = user
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}
}
