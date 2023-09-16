export function SetData(key, value) {
  window.localStorage.setItem(key, value);
}

export function GetData(key) {
  return window.localStorage.getItem(key);
}

export function ClearItem(key) {
  return window.localStorage.removeItem(key);
}

export function ClearAll() {
  return window.localStorage.clear();
}
