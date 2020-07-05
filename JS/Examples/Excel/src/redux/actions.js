import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE
} from './types'

// Action Creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

// value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}
