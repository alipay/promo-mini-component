/**
 * 摇一摇
 * @param {func} success
 */
export function watchPhoneShake(success = () => {}) {
  my.watchShake({ success });
}

/**
 * 调用手机震动
 * @param {func} success
 */
export function callPhoneVibrate(success = () => {}) {
  my.vibrate({ success })
}

export function toast(msg, duration = 3000) {
  my.showToast({
    content: JSON.stringify(msg),
    duration,
  });
}
