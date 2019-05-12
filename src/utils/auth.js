// 用户权限
export function getCurrentAuthority() {
  return ["admin"];
}

// 校验权限
export function isCheck(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

// 判断是否登陆
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
